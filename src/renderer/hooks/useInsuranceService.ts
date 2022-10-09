import { InsuranceService } from "renderer/services";

const insuranceService = new InsuranceService();

export const useInsuranceService = () => {
  
  const getAll = () => insuranceService.getAll();

  return { getAll };
}