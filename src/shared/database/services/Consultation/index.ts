import ConsultationService from './ConsultationService';
import Channels from '../../../ipcChannels';
import { ipcMain } from 'electron';
import { Consultation } from '../../entities/Consultation';

let consultationService = new ConsultationService(Consultation);

ipcMain.handle(Channels.consultation.getAll, async () => {
  return await consultationService.getAll();
});

ipcMain.handle(Channels.consultation.getOne, async (_, consultationId: number) => {
  return await consultationService.getById(consultationId);
});

ipcMain.handle(Channels.consultation.create, async (_, consultation: Consultation) => {
  return await consultationService.create(consultation);
});

ipcMain.handle(Channels.consultation.delete, async (_, IDs: number[]) => {
  return await consultationService.delete(IDs);
})

ipcMain.on(Channels.consultation.update, async (_, consultationId: number, newConsultationValues: Consultation) => {
  await consultationService.update(consultationId, newConsultationValues);
})