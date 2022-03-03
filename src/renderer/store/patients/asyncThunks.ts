import { createAsyncThunk } from '@reduxjs/toolkit';
const { ipcRenderer } = window.require('electron');
import { Patient } from 'shared/database/entities/Patient';
import Channels from 'shared/ipcChannels';

export const requestPatientsAsync = createAsyncThunk('patients/request', async (): Promise<Patient[]> => {
  return await ipcRenderer.invoke(Channels.patient.getAll);
});

export const requestSinglePatientAsync = createAsyncThunk('patients/requestSingle', async (patientId: number): Promise<Patient> => {
  return await ipcRenderer.invoke(Channels.patient.getOne, patientId);
});

export const createNewPatientAsync = createAsyncThunk('patients/create', async (newPatient: Patient): Promise<void> => {
  ipcRenderer.send(Channels.patient.create, newPatient);
});

export const deletePatientsWithIdAsync = createAsyncThunk('patients/delete', async (IDs: number[]): Promise<Patient[]> => {
  return await ipcRenderer.invoke(Channels.patient.delete, IDs);
});

type UpdatePatientArgs = {
  patientId: number;
  newPatientValues: Patient;
}
export const updatePatientAsync = createAsyncThunk('patients/update', async ({patientId, newPatientValues}: UpdatePatientArgs): Promise<void> => {
  ipcRenderer.send(Channels.patient.update, patientId, newPatientValues);
});
