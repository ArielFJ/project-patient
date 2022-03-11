import { Consultation } from "../../entities/Consultation";
import BaseService from "../BaseService";

export default class ConsultationService extends BaseService<Consultation> {
  
  updateEntityProperties(entity: Consultation, newEntityProperties: Consultation): void {
    entity.reason = newEntityProperties.reason;
    entity.treatment = newEntityProperties.treatment;
    entity.diagnosis = newEntityProperties.diagnosis;
    entity.date = newEntityProperties.date;
    entity.isActive = newEntityProperties.isActive;
    entity.attended = newEntityProperties.attended;
  }

  getByPatientId(patientId: number): Promise<Consultation[]> {
    return this.repository.find({
      where: {
        patient: {
          id: patientId
        }
      }
    });
  }
  
}