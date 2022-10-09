import InsuranceService from './InsuranceService';
import Channels from '../../../ipcChannels';
import { ipcMain } from 'electron';
import { Insurance } from '../../../database/entities';

const insuranceService = new InsuranceService(Insurance);

ipcMain.handle(Channels.insurance.getAll, async () => {
  return await insuranceService.getAll();
});

ipcMain.handle(Channels.insurance.getOne, async (_, id: number) => {
  return await insuranceService.getById(id);
});

ipcMain.handle(Channels.insurance.create, async (_, insurance: Insurance) => {
  return await insuranceService.create(insurance);
});

ipcMain.handle(Channels.insurance.delete, async (_, IDs: number[]) => {
  return await insuranceService.delete(IDs);
});

ipcMain.handle(Channels.insurance.update, async (_, id: number, newValues: Insurance) => {
  await insuranceService.update(id, newValues);
});
