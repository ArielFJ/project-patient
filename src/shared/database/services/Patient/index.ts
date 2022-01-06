import PatientService from './PatientService';
import Channels from '../../../ipcChannels';
import { ipcMain } from 'electron';

let patientService = PatientService.getInstance();

ipcMain.handle(Channels.patient.getAll, async () => {
  return await patientService.getAll();
});