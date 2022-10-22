import { ChannelMethod } from './constants';

const patient: ChannelMethod = {
  getAll: 'get-all-patients',
  getOne: 'get-one-patient',
  create: 'create-patient',
  delete: 'delete-patient',
  update: 'update-patient'
};

const insurance: ChannelMethod = {
  getAll: 'get-all-insurances',
  getOne: 'get-one-insurance',
  create: 'create-insurance',
  delete: 'delete-insurance',
  update: 'update-insurance'
};

const insuranceType: ChannelMethod = {
  getAll: 'get-all-insuranceTypes',
  getOne: 'get-one-insuranceType',
  create: 'create-insuranceType',
  delete: 'delete-insuranceType',
  update: 'update-insuranceType'
};

const consultation: ChannelMethod & {
  getByPatientId: string;
} = {
  getAll: 'get-all-consultations',
  getByPatientId: 'get-by-patient-consultations',
  getOne: 'get-one-consultation',
  create: 'create-consultation',
  delete: 'delete-consultation',
  update: 'update-consultation'
};

const dialog = {
  message: 'message-dialog',
  confirm: 'confirm-dialog'
};

const Channels = {
  patient,
  consultation,
  insurance,
  insuranceType,
  dialog
};

export default Channels;
