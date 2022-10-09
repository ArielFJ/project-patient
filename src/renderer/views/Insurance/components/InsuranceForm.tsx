import React, { useState } from 'react';

// material-ui
import { Box, Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'renderer/_TEMPLATE/ui-component/extended/AnimateButton';

// assets
import MuiFormControl from 'renderer/_TEMPLATE/ui-component/forms/MuiFormControl';
import { Insurance } from 'shared/database/entities';

type PatientFormProps = {
  defaultInsurance?: Insurance;
  onSubmit: (values: Insurance) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const InsuranceForm = ({ defaultInsurance, onSubmit }: PatientFormProps): JSX.Element => {
  const [insurance] = useState(defaultInsurance ?? Insurance.Empty());

  const validationObjectShape = {
    name: Yup.string().max(255).required('Name is required')
    // types: Yup.array().of(Yup.number()).min(1).required('Types is required')
  };

  return (
    <Formik initialValues={insurance} validationSchema={Yup.object().shape(validationObjectShape)} onSubmit={onSubmit}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container gap={2} justifyContent="center">
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="types-input-label">Types</InputLabel>
                <Select
                  labelId="types-input-label"
                  id="types-input"
                  name="types"
                  multiple
                  renderValue={(selected) => (selected as string[]).join(', ')}
                  input={<OutlinedInput label="Types" />}
                  value={[]}
                  fullWidth
                  MenuProps={MenuProps}
                >
                  {[1, 2, 3].map((type) => (
                    <MenuItem key={type} value={type}>
                      {/* <Checkbox checked={values.types.indexOf(type) > -1} /> */}
                      <ListItemText primary={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default InsuranceForm;
