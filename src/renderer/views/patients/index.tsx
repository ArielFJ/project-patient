import React, { useEffect, useState } from 'react';
// import { Typography } from '@mui/material';
import MainCard from 'renderer/ui-component/cards/MainCard';
import AddPatientFloatingButton from './components/AddPatientFloatingButton';
// import PatientService from 'shared/database/services/Patient/PatientService';
import { Patient } from 'shared/database/entities/Patient';
const { ipcRenderer } = window.require('electron');
import Channels from 'shared/ipcChannels';

const Patients: React.FC = (): JSX.Element => {
  //   let patientService: PatientService;
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    handleClick();
    setPatients([]);
  }, []);

  const handleClick = () => {
    ipcRenderer.invoke(Channels.patient.getAll).then(setPatients);
  };

  return (
    <>
      <MainCard title="Patients">
        <ul>
          {patients &&
            patients.map((patient) => (
              <li key={patient.id}>
                <span>{patient.fechaNacimiento.toLocaleDateString()} - {patient.nombre}</span>
              </li>
            ))}
        </ul>
      </MainCard>
      <AddPatientFloatingButton onClick={handleClick} />
    </>
  );
};

export default Patients;
