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

  // async update(id:number, patient: Patient): Promise<void> {
  //   const soughtPatient = await this.repository.findOne(id);
  //   if (!soughtPatient) return;
    
  //   soughtPatient.name = patient.name;
  //   soughtPatient.email = patient.email;
  //   soughtPatient.phone = patient.phone;
  //   soughtPatient.birthDate = patient.birthDate;
  //   soughtPatient.bloodPressure = patient.bloodPressure;
  //   soughtPatient.headCircumference = patient.headCircumference;
  //   soughtPatient.height = patient.height;
  //   soughtPatient.weight = patient.weight;

  //   await this.repository.save(soughtPatient);
  // } 

}