import { Consultation } from "../../entities/Consultation";
import BaseService from "../BaseService";

export default class ConsultationService extends BaseService<Consultation> {
  
  updateEntityProperties(entity: Consultation, newEntityProperties: Consultation): void {
    throw new Error("Consultation update not implemented.");
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