import React, { useState } from 'react';

// material-ui
import { Box, Button, Grid } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'renderer/ui-component/extended/AnimateButton';

// assets
import { Patient } from 'shared/database/entities/Patient';
import MuiDatePicker from 'renderer/ui-component/forms/MuiDatePicker';
import MuiFormControl from 'renderer/ui-component/forms/MuiFormControl';
// import Channels from 'shared/ipcChannels';
import { createNewPatientAsync } from 'renderer/store/patients/patientSlice';
import { useAppDispatch } from 'renderer/store/hooks';

const AddPatientForm = ({ onSubmit }: { onSubmit: () => void }): JSX.Element => {
  const [patient, setPatient] = useState(Patient.Empty);
  const dispatch = useAppDispatch();

  const validationObjectShape = {
    name: Yup.string().max(255).required('Name is required'),
    birthDate: Yup.date().default(new Date()),
    phone: Yup.string().max(15),
    email: Yup.string().email('Must be a valid email').max(255),
    weight: Yup.number().default(0),
    height: Yup.number().default(0),
    headCircunference: Yup.number().default(0),
    bloodPressure: Yup.number().default(0)
  };

  const onNewDateAssigned = (newDate: Date) => {
    setPatient(currentPatient => ({ ...currentPatient, birthDate: newDate }));
  };

  return (
    <Formik
      initialValues={patient}
      validationSchema={Yup.object().shape(validationObjectShape)}
      // eslint-disable-next-line
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const newPatient = values;
        newPatient.birthDate = patient.birthDate;
        dispatch(createNewPatientAsync(newPatient)).then(() => {
          onSubmit();
        });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <MuiFormControl
                id="name-input"
                label="Name"
                name="name"
                defaultValue={values.name}
                error={Boolean(touched.name && errors.name)}
                errorHelperText={errors.name}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <MuiDatePicker
                label="Birth Date"
                initialValue={values.birthDate}
                onNewDateAssigned={onNewDateAssigned}
              />
            </Grid>
            <Grid item xs={8}>
              <MuiFormControl
                id="email-input"
                label="Email"
                name="email"
                defaultValue={values.email}
                error={Boolean(touched.email && errors.email)}
                errorHelperText={errors.email}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <MuiFormControl
                id="phone-input"
                label="Telephone"
                name="phone"
                defaultValue={values.phone}
                error={Boolean(touched.phone && errors.phone)}
                errorHelperText={errors.phone}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiFormControl
                id="weight-input"
                type="number"
                label="Weight (LB)"
                name="weight"
                defaultValue={values.weight}
                error={Boolean(touched.weight && errors.weight)}
                errorHelperText={errors.weight}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiFormControl
                id="height-input"
                type="number"
                label="Height (FT)"
                name="height"
                defaultValue={values.height}
                error={Boolean(touched.height && errors.height)}
                errorHelperText={errors.height}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiFormControl
                id="head-circumference-input"
                type="number"
                label="Head Circumference"
                name="headCircumference"
                defaultValue={values.headCircumference}
                error={Boolean(touched.headCircumference && errors.headCircumference)}
                errorHelperText={errors.headCircumference}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiFormControl
                id="bloodPressure-input"
                type="number"
                label="Blood Pressure"
                name="bloodPressure"
                defaultValue={values.bloodPressure}
                error={Boolean(touched.bloodPressure && errors.bloodPressure)}
                errorHelperText={errors.bloodPressure}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
              label="Remember me"
            />
            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              Forgot Password?
            </Typography>
          </Stack> */}
          {/* {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )} */}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Create
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AddPatientForm;
