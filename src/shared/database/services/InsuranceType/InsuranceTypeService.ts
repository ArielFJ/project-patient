import { InsuranceType } from '../../entities';
import BaseService from '../BaseService';

export default class InsuranceTypeService extends BaseService<InsuranceType> {
  updateEntityProperties(entity: InsuranceType, newEntityProperties: InsuranceType): void {
    entity.name = newEntityProperties.name;
  }
}
