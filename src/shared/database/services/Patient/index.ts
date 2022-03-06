import PatientService from './PatientService';
import Channels from '../../../ipcChannels';
import { ipcMain } from 'electron';
import { Patient } from '../../entities/Patient';

let patientService = new PatientService(Patient);

ipcMain.handle(Channels.patient.getAll, async () => {
  return await patientService.getAll();
});

ipcMain.handle(Channels.patient.getOne, async (_, patientId: number) => {
  return await patientService.getById(patientId);
});

ipcMain.on(Channels.patient.create, async (_, patient: Patient) => {
  await patientService.create(patient);
});

ipcMain.handle(Channels.patient.delete, async (_, IDs: number[]) => {
  return await patientService.delete(IDs);
})

ipcMain.on(Channels.patient.update, async (_, patientId: number, newPatientValues: Patient) => {
  await patientService.update(patientId, newPatientValues);
})