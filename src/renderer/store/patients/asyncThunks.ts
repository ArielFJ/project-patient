import { createAsyncThunk } from '@reduxjs/toolkit';
const { ipcRenderer } = window.require('electron');
import { Patient } from 'shared/database/entities/Patient';
import Channels from 'shared/ipcChannels';

export const requestPatientsAsync = createAsyncThunk('patients/request', async (): Promise<Patient[]> => {
  return await ipcRenderer.invoke(Channels.patient.getAll);
});

export const createNewPatientAsync = createAsyncThunk('patients/create', async (newPatient: Patient): Promise<void> => {
  ipcRenderer.send(Channels.patient.create, newPatient);
});

export const deletePatientsWithIdAsync = createAsyncThunk('patients/delete', async (IDs: number[]): Promise<Patient[]> => {
  return await ipcRenderer.invoke(Channels.patient.delete, IDs);
});
