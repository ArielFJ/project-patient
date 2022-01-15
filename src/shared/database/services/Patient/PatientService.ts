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

  create(patient: Patient): Promise<Patient> {
    return this.repository.save(patient);
  }
}