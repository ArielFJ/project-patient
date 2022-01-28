import PatientService from './PatientService';
import Channels from '../../../ipcChannels';
import { ipcMain } from 'electron';
import { Patient } from 'shared/database/entities/Patient';

let patientService = PatientService.getInstance();

ipcMain.handle(Channels.patient.getAll, async () => {
  return await patientService.getAll();
});

ipcMain.on(Channels.patient.create, async (event, patient: Patient) => {
  await patientService.create(patient);
});

ipcMain.handle(Channels.patient.delete, async (event, IDs: number[]) => {
  return await patientService.delete(IDs);
})