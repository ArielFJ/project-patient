const { ipcRenderer } = window.require('electron');

import React, { useState } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import MuiFormControl from 'renderer/ui-component/forms/MuiFormControl';
import { Consultation } from 'shared/database/entities/Consultation';
import { Formik } from 'formik';
import { Patient } from 'shared/database/entities/Patient';
import { IconCheck } from '@tabler/icons';
import Channels from 'shared/ipcChannels';

type TextAreaFieldProps = {
  id: string;
  description?: string;
  name: string;
  error: boolean;
  errorHelperText?: string;
  // eslint-disable-next-line
  onBlur: (event: React.FocusEvent<any, Element>) => void;
  // eslint-disable-next-line
  onChange: (event: React.ChangeEvent<any>) => void;
};

const TextAreaField = ({ id, description, name, error, errorHelperText, onBlur, onChange }: TextAreaFieldProps): JSX.Element => {
  return (
    <MuiFormControl
      id={id}
      type="text"
      label=""
      placeholder={description}
      name={name}
      error={error}
      errorHelperText={errorHelperText}
      fullWidth
      multiline
      rows={5}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

// ==================== FORM ==========================

type ConsultationFormProps = {
  patient?: Patient;
  onSubmit: () => void;
  isUpdating?: boolean;
};

const ConsultationForm = ({ patient, onSubmit, isUpdating = false }: ConsultationFormProps): JSX.Element => {
  const [consultation, setConsultation] = useState<Consultation>(Consultation.CreateEmpty());

  const handleSubmit = (newConsultation: Consultation) => {
    newConsultation.patient = patient;
    // console.log(newConsultation);
    ipcRenderer.invoke(Channels.consultation.create, newConsultation).then((consultation) => {
      new Notification('Consultation Created Successfully', {
        body: `A new consultation for ${consultation.patient.name} has been registered`
      });
      onSubmit();
    });
  };

  return (
    <Formik initialValues={consultation} onSubmit={handleSubmit}>
      {/* eslint-disable-next-line */}
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" gutterBottom component="span" color="#6a6a6a">
                Reason
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextAreaField
                id="reason-step"
                name="reason"
                description="Patient's reason"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched?.reason && errors?.reason)}
                errorHelperText={errors?.reason}
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" gutterBottom component="span" color="#6a6a6a">
                Treatment
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextAreaField
                id="treatment-step"
                name="treatment"
                description="Patient's treatment"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched?.treatment && errors?.treatment)}
                errorHelperText={errors?.treatment}
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="subtitle1" gutterBottom component="span" color="#6a6a6a">
                Diagnosis
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextAreaField
                id="diagnosis-step"
                name="diagnosis"
                description="Patient's diagnosis"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched?.diagnosis && errors?.diagnosis)}
                errorHelperText={errors?.diagnosis}
              />
            </Grid>
            {/* <Grid item xs={} */}
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} /> {/* Create horizontal space */}
            <Button type="submit" sx={{ color: '#009988' }}>
              Save &nbsp; <IconCheck />
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ConsultationForm;
