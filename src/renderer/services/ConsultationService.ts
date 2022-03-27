import { Consultation } from 'shared/database/entities/Consultation';
import IBaseEntityService from 'renderer/interfaces/IBaseEntityService';
import Channels from 'shared/ipcChannels';
const { ipcRenderer } = window.require('electron');

class ConsultationService implements IBaseEntityService<Consultation> {
  getAll(): Promise<Consultation[]> {
    return ipcRenderer.invoke(Channels.consultation.getAll);
  }

  getById(id: number): Promise<Consultation> {
    return ipcRenderer.invoke(Channels.consultation.getOne, id);
  }

  getByPatientId(patientId: number): Promise<Consultation[]> {
    return ipcRenderer.invoke(Channels.consultation.getByPatientId, patientId);
  }

  create(newValues: Consultation): Promise<Consultation> {
    return ipcRenderer.invoke(Channels.consultation.create, newValues);
  }

  delete(id: number): Promise<void> {
    return ipcRenderer.invoke(Channels.consultation.delete, id);
  }

  update(id: number, newValues: Consultation): Promise<void> {
    return ipcRenderer.invoke(Channels.consultation.update, id, newValues);
  }
}

export default ConsultationService;
