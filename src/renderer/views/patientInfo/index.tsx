import React, { useEffect, useState } from 'react';
// material-ui
import { Button } from '@mui/material';

// project imports
import MainCard from 'renderer/ui-component/cards/MainCard';
import { Patient } from 'shared/database/entities/Patient';
import { useNavigate, useParams } from 'react-router';
// import { useAppDispatch } from 'renderer/store/hooks';
import { useSelector } from 'react-redux';
import { patientSelector } from 'renderer/store/patients/selectors';

// ==============================|| SAMPLE PAGE ||============================== //

const PatientInfo: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const soughtPatient: Patient = useSelector(patientSelector(Number(id)));
  const [patient, setPatient] = useState<Patient | undefined>();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(requestPatientAsync(Number(id)))
    //   .unwrap()
    //   .then((patient: Patient) => setPatient(patient));
    setPatient(soughtPatient);
    return () => {
      setPatient(undefined);
    };
  }, []);

  return (
    <>
      <MainCard title="Patient">
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <br />
        <br />
        {id}
        <br />
        {patient?.name}
      </MainCard>
    </>
  );
};

export default PatientInfo;
