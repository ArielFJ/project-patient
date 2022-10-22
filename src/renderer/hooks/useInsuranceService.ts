import { InsuranceService } from "renderer/services";
import { createEntityHook } from "./createEntityHook";

const service = new InsuranceService();

export const useInsuranceService = () => createEntityHook(service);