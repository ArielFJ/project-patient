import { Patient } from "../../entities/Patient";
import BaseService from "../BaseService";

export default class PatientService extends BaseService<Patient> {
  updateEntityProperties(entity: Patient, newEntityProperties: Patient): void {
    entity.name = newEntityProperties.name;
    entity.email = newEntityProperties.email;
    entity.phone = newEntityProperties.phone;
    entity.birthDate = newEntityProperties.birthDate;
    entity.bloodPressure = newEntityProperties.bloodPressure;
    entity.headCircumference = newEntityProperties.headCircumference;
    entity.height = newEntityProperties.height;
    entity.weight = newEntityProperties.weight;
    entity.isActive = newEntityProperties.isActive;
  }
}