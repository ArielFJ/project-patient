import Channels from '../../../ipcChannels';
import { ipcMain } from 'electron';
import { InsuranceType } from '../../../database/entities';
import InsuranceTypeService from './InsuranceTypeService';

const service = new InsuranceTypeService(InsuranceType);

ipcMain.handle(Channels.insuranceType.getAll, async () => {
  return await service.getAll();
});

ipcMain.handle(Channels.insuranceType.getOne, async (_, id: number) => {
  return await service.getById(id);
});

ipcMain.handle(Channels.insuranceType.create, async (_, entity: InsuranceType) => {
  return await service.create(entity);
});

ipcMain.handle(Channels.insuranceType.delete, async (_, id: number) => {
  return await service.delete([id]);
});

ipcMain.handle(Channels.insuranceType.update, async (_, id: number, newValues: InsuranceType) => {
  await service.update(id, newValues);
});
