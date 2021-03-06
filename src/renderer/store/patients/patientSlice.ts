import { createSlice } from '@reduxjs/toolkit';
import { Patient } from 'shared/database/entities/Patient';
import { requestPatientsAsync, createNewPatientAsync, deletePatientsWithIdAsync, updatePatientAsync, requestSinglePatientAsync } from './asyncThunks';

export type PatientsState = {
  patients: Patient[];
  selectedPatient?: Patient;
  shouldUpdatePatients: boolean;
};

const initialState: PatientsState = {
  patients: [],
  shouldUpdatePatients: false
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(requestPatientsAsync.fulfilled, (state, action) => {
      state.patients = action.payload;
      state.shouldUpdatePatients = false;
    });
    builder.addCase(requestSinglePatientAsync.fulfilled, (state, action) => {
      state.selectedPatient = action.payload;
      state.shouldUpdatePatients = true;
    });
    builder.addCase(createNewPatientAsync.fulfilled, (state) => {
      state.shouldUpdatePatients = true;
    });
    builder.addCase(deletePatientsWithIdAsync.fulfilled, (state) => {
      state.shouldUpdatePatients = true;
    });
    builder.addCase(updatePatientAsync.fulfilled, (state) => {
      state.shouldUpdatePatients = true;
    });
  }
});

// Actual Reducer
export default patientSlice.reducer;
