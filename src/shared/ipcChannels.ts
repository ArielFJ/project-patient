const patient = {
  getAll: 'get-all-patients',
  getOne: 'get-one-patient',
  create: 'create-patient',
  delete: 'delete-patient',
  update: 'update-patient',
}

const insurance = {
  getAll: 'get-all-insurances',
  getOne: 'get-one-insurance',
  create: 'create-insurance',
  delete: 'delete-insurance',
  update: 'update-insurance',
}

const consultation = {
  getAll: 'get-all-consultations',
  getByPatientId: 'get-by-patient-consultations',
  getOne: 'get-one-consultation',
  create: 'create-consultation',
  delete: 'delete-consultation',
  update: 'update-consultation',
}

const dialog = {
  message: 'message-dialog',
  confirm: 'confirm-dialog'
}

const Channels = {
  patient,
  consultation,
  insurance,
  dialog
}

export default Channels;