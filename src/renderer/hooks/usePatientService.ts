import { PatientService } from "renderer/services";
import { createEntityHook } from "./createEntityHook";

const service = new PatientService();

export const usePatientService = () => createEntityHook(service);