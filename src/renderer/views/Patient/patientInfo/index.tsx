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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Consultation } from 'shared/database/entities/Consultation';

// ==============================|| SAMPLE PAGE ||============================== //

const PatientInfoPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const dispatch = useAppDispatch();
  const dialogContainerRef = React.useRef<DialogContainerRef>(null);

  useEffect(() => {
    ipcRenderer.invoke(Channels.patient.getOne, id).then((patient: Patient) => setPatient(patient));
    ipcRenderer.invoke(Channels.consultation.getByPatientId, Number(id)).then((consultations: Consultation[]) => {
      setConsultations(consultations);
    });
    return () => {
      setPatient(undefined);
    };
  }, []);

  const handleSubmit = (patientToUpdate: Patient) => {
    dispatch(updatePatientAsync({ patientId: Number(id), newPatientValues: patientToUpdate }));
  };

  const formatDate = (dateAsString?: string): string => {
    return `${new Date(dateAsString ?? '-').toLocaleDateString(['en', 'es'], { timeZone: 'UTC' }) || '-'}`;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      valueGetter: (params: GridValueGetterParams) => formatDate(params.row.date?.toString()),
      minWidth: 50,
      flex: .4
    },
    { field: 'reason', headerName: 'Reason', flex: 1, minWidth: 200 },
    { field: 'treatment', headerName: 'Treatment', flex: 1, minWidth: 200 },
    { field: 'diagnosis', headerName: 'Diagnosis', flex: 1, minWidth: 200 }
  ];

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
        {patient && (
          <>
            <Grid container>
              <Grid item xs={9}>
                <PatientForm defaultPatient={patient} onSubmit={handleSubmit} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={2}>
                <Box sx={{ flexDirection: 'row-reverse' }}>
                  <Button variant="contained" onClick={() => dialogContainerRef.current?.Open()}>
                    {<IconPlus />} &nbsp; Add Consultation
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
              <DataGrid
                sx={{ height: '40vh' }}
                rows={consultations ?? []}
                columns={columns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                disableSelectionOnClick
                rowHeight={100}
              />
            </Box>
          </>
        )}
      </MainCard>

      <DialogContainer title="New Consultation" ref={dialogContainerRef}>
        <ConsultationForm patient={patient} onSubmit={() => dialogContainerRef.current?.Close()} />
      </DialogContainer>
    </>
  );
};

export default PatientInfoPage;
