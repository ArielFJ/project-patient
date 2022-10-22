import Channels from 'shared/ipcChannels';
import { InsuranceType } from 'shared/database/entities';
import BaseService from './BaseService';

class InsuranceTypeService extends BaseService<InsuranceType> {
  channel: Record<string, string> = Channels.insuranceType;
}

export default InsuranceTypeService;
