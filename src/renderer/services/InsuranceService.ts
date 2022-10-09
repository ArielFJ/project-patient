import IBaseEntityService from 'renderer/interfaces/IBaseEntityService';
import Channels from 'shared/ipcChannels';
import { Insurance } from 'shared/database/entities';

const { ipcRenderer } = window.require('electron');

class InsuranceService implements IBaseEntityService<Insurance> {
  getAll(): Promise<Insurance[]> {
    return ipcRenderer.invoke(Channels.insurance.getAll);
  }

  getById(id: number): Promise<Insurance> {
    return ipcRenderer.invoke(Channels.insurance.getOne, id);
  }

  create(newValues: Insurance): Promise<Insurance> {
    return ipcRenderer.invoke(Channels.insurance.create, newValues);
  }

  delete(id: number): Promise<void> {
    return ipcRenderer.invoke(Channels.insurance.delete, id);
  }

  update(id: number, newValues: Insurance): Promise<void> {
    return ipcRenderer.invoke(Channels.insurance.update, id, newValues);
  }
}

export default InsuranceService;
