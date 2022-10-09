import { Insurance } from "../../entities";
import BaseService from "../BaseService";

export default class InsuranceService extends BaseService<Insurance> {

  getAll(): Promise<Insurance[]> {
    return this.repository.find({ relations: ['types'] });
  }

  updateEntityProperties(entity: Insurance, newEntityProperties: Insurance): void {
    entity.name = newEntityProperties.name;
    entity.types = newEntityProperties.types;
  }
}