import { getRepository, Repository } from "typeorm";
import { Patient } from "../../entities/Patient";

export default class PatientService {
  private static instance: PatientService;
  
  private repository: Repository<Patient>;
  
  private constructor() {
    this.repository = getRepository(Patient);
  }

  static getInstance(): PatientService {
    if (!PatientService.instance) {
      PatientService.instance = new PatientService();
    }

    return PatientService.instance;
  }

  getAll(): Promise<Patient[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<Patient | undefined> {
    return this.repository.findOne(id);
  }

  create(patient: Patient): Promise<Patient> {
    return this.repository.save(patient);
  }

  async update(id:number, patient: Patient): Promise<void> {
    const soughtPatient = await this.repository.findOne(id);
    if (!soughtPatient) return;
    
    soughtPatient.name = patient.name;
    soughtPatient.email = patient.email;
    soughtPatient.phone = patient.phone;
    soughtPatient.birthDate = patient.birthDate;
    soughtPatient.bloodPressure = patient.bloodPressure;
    soughtPatient.headCircumference = patient.headCircumference;
    soughtPatient.height = patient.height;
    soughtPatient.weight = patient.weight;

    await this.repository.save(soughtPatient);
  } 

  async delete(IDs: number[]): Promise<Patient[]> {
    let patients = await this.repository.findByIds(IDs);
    return await this.repository.remove(patients);
  }
}