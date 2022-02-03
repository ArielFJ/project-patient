import React, { useEffect, useState } from 'react';
// material-ui
import { Box, Button, Typography } from '@mui/material';

// project imports
import MainCard from 'renderer/ui-component/cards/MainCard';
import { Patient } from 'shared/database/entities/Patient';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch } from 'renderer/store/hooks';
import { useSelector } from 'react-redux';
import { patientSelector } from 'renderer/store/patients/selectors';
import PatientForm from '../patients/components/PatientForm';
import { updatePatientAsync } from 'renderer/store/patients/asyncThunks';
import { IconChevronLeft } from '@tabler/icons';
import AnimateButton from 'renderer/ui-component/extended/AnimateButton';

// ==============================|| SAMPLE PAGE ||============================== //

const PatientInfo: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const soughtPatient: Patient = useSelector(patientSelector(Number(id)));
  const [patient, setPatient] = useState<Patient | undefined>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPatient(soughtPatient);
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
      <MainCard title={title}>{patient && <PatientForm defaultPatient={patient} onSubmit={handleSubmit} />}</MainCard>
    </>
  );
};

export default PatientInfo;
