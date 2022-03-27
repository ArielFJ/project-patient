import IBaseEntityService from 'renderer/interfaces/IBaseEntityService';
import { Patient } from 'shared/database/entities/Patient';
import Channels from 'shared/ipcChannels';
const { ipcRenderer } = window.require('electron');

class PatientService implements IBaseEntityService<Patient> {
  getAll(): Promise<Patient[]> {
    return ipcRenderer.invoke(Channels.patient.getAll);
  }
  
  getById(id: number): Promise<Patient> {
    return ipcRenderer.invoke(Channels.patient.getOne, id);
  }
  
  create(newValues: Patient): Promise<Patient> {
    return ipcRenderer.invoke(Channels.patient.create, newValues);
  }
  
  delete(id: number): Promise<void> {
    return ipcRenderer.invoke(Channels.patient.delete, id);
  }
  
  update(id: number, newValues: Patient): Promise<void> {
    return ipcRenderer.invoke(Channels.patient.update, id, newValues);
  }
}

export default PatientService;