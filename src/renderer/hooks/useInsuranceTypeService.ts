import { InsuranceTypeService } from "renderer/services";
import { createEntityHook } from "./createEntityHook";

const service = new InsuranceTypeService();

export const useInsuranceTypeService = () => createEntityHook(service);