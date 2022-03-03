import { Patient } from 'shared/database/entities/Patient';
import { RootState } from './../index';

const patientsSelector = (state: RootState): Patient[] => state.patient.patients;

type PatientFilterCallback = (state: RootState) => Patient;
const patientSelector = (patientId: number): PatientFilterCallback => {
  const filterById = (patient: Patient) => patient.id == patientId;
  return (state: RootState) => state.patient.patients.filter(filterById)[0];
};

const selectedPatientSelector = (state: RootState): Patient | undefined => state.patient.selectedPatient;

export {
  patientsSelector,
  patientSelector,
  selectedPatientSelector
};