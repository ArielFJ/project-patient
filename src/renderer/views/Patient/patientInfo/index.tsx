import React, { useEffect, useState } from 'react';
// material-ui
import { Box, Button, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'renderer/ui-component/cards/MainCard';
import { Patient } from 'shared/database/entities/Patient';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch } from 'renderer/store/hooks';
import { updatePatientAsync } from 'renderer/store/patients/asyncThunks';
import { IconChevronLeft, IconPlus } from '@tabler/icons';
import AnimateButton from 'renderer/ui-component/extended/AnimateButton';
import PatientForm from '../components/PatientForm';
const { ipcRenderer } = window.require('electron');
import Channels from 'shared/ipcChannels';
import DialogContainer, { DialogContainerRef } from 'renderer/ui-component/DialogContainer';
import ConsultationForm from 'renderer/views/Consultation/components/ConsultationForm';

// ==============================|| SAMPLE PAGE ||============================== //

const PatientInfoPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();
  const dispatch = useAppDispatch();
  const dialogContainerRef = React.useRef<DialogContainerRef>(null);

  useEffect(() => {
    ipcRenderer.invoke(Channels.patient.getOne, id).then((patient: Patient) => setPatient(patient));
    return () => {
      setPatient(undefined);
    };
  }, []);

  const handleSubmit = (patientToUpdate: Patient) => {
    dispatch(updatePatientAsync({ patientId: Number(id), newPatientValues: patientToUpdate }));
  };

  const title: JSX.Element = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AnimateButton scale={1.5}>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            color: 'black'
          }}
        >
          <IconChevronLeft />
        </Button>
      </AnimateButton>
      <Typography variant="h4">Patient</Typography>
    </Box>
  );

  return (
    <>
      <MainCard title={title}>
        {/* <Tooltip title="Add Consultation" placement="top" disableInteractive>
          <Fab component="div" onClick={() => console.log('clicked')} size="medium" variant="circular" color="secondary">
            <IconButton color="inherit" size="large" disableRipple></IconButton>
          </Fab>
        </Tooltip> */}
        {patient && (
          <Grid container>
            <Grid item xs={10}>
              <PatientForm defaultPatient={patient} onSubmit={handleSubmit} />
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ flexDirection: 'row-reverse' }}>
                <Button variant="contained" onClick={() => dialogContainerRef.current?.Open()}>
                  {<IconPlus />} &nbsp; Add Consultation
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </MainCard>

      <DialogContainer title="New Consultation" ref={dialogContainerRef}>
        <ConsultationForm patient={patient} onSubmit={() => dialogContainerRef.current?.Close()} />
      </DialogContainer>
    </>
  );
};

export default PatientInfoPage;
