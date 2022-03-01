const patient = {
  getAll: 'get-all-patients',
  getOne: 'get-one-patient',
  create: 'create-patient',
  delete: 'delete-patient',
  update: 'update-patient',
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
  dialog
}

export default Channels;