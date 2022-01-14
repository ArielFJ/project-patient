import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'renderer/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Patient } from 'shared/database/entities/Patient';

const AddPatientForm = (): JSX.Element => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const initialValue: Patient = Patient.Empty;
  const validationObjectShape = {
    name: Yup.string().max(255).required('Name is required'),
    birthDate: Yup.date().default(new Date()),
    phone: Yup.string(),
    email: Yup.string().email('Must be a valid email').max(255),
    weight: Yup.number().default(0),
    height: Yup.number().default(0),
    headCircunference: Yup.number().default(0),
    bloodPressure: Yup.number().default(0),
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Yup.object().shape(validationObjectShape)}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log(values);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-login">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name-login"
              type="text"
              value={values.name}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Name"
              inputProps={{}}
            />
            {touched.name && errors.name && (
              <FormHelperText error id="standard-weight-helper-text-name-login">
                {errors.name}
              </FormHelperText>
            )}
          </FormControl>

          {/* <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.name}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl> */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
              label="Remember me"
            />
            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              Forgot Password?
            </Typography>
          </Stack>
          {/* {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )} */}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign in
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AddPatientForm;
