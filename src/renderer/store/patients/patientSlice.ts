import { createSlice } from '@reduxjs/toolkit';
import { Patient } from 'shared/database/entities/Patient';
import { requestPatientsAsync, createNewPatientAsync } from './asyncThunks';

export type PatientsState = {
  patients: Patient[];
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
    // eslint-disable-next-line
    create: (state, payload) => {
      // eslint-disable-next-line
      const i = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(requestPatientsAsync.fulfilled, (state, action) => {
      state.patients = action.payload;
      state.shouldUpdatePatients = false;
    });
    builder.addCase(createNewPatientAsync.fulfilled, (state) => {
      state.shouldUpdatePatients = true;
    });
  }
});

// Reducer Actions
export const { create } = patientSlice.actions;

// Reducer Async Actions
export { requestPatientsAsync, createNewPatientAsync };

// Actual Reducer
export default patientSlice.reducer;
