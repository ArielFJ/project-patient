import { ConsultationService } from 'renderer/services';
import { createEntityHook } from './createEntityHook';

const service = new ConsultationService();

export const useConsultationService = () => ({
  ...createEntityHook(service),
  getByPatientId: (patientId: number) => service.getByPatientId(patientId)
});
