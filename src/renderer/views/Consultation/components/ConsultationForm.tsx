import React, { useState } from 'react';
import { Typography, Grid, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import MuiFormControl from 'renderer/_TEMPLATE/ui-component/forms/MuiFormControl';
import { Consultation } from 'shared/database/entities/Consultation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Patient } from 'shared/database/entities/Patient';
import { IconCheck } from '@tabler/icons';
import MuiDatePicker from 'renderer/_TEMPLATE/ui-component/forms/MuiDatePicker';
import ConsultationService from 'renderer/services/ConsultationService';

type TextAreaFieldProps = {
  id: string;
  description?: string;
  name: string;
  value?: string;
  error: boolean;
  errorHelperText?: string;
  // eslint-disable-next-line
  onBlur: (event: React.FocusEvent<any, Element>) => void;
  // eslint-disable-next-line
  onChange: (event: React.ChangeEvent<any>) => void;
};

const TextAreaField = ({ id, description, name, value, error, errorHelperText, onBlur, onChange }: TextAreaFieldProps): JSX.Element => {
  return (
    <MuiFormControl
      id={id}
      type="text"
      label=""
      placeholder={description}
      name={name}
      error={error}
      errorHelperText={errorHelperText}
      defaultValue={value}
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
  consultationModel?: Consultation;
  onSubmit: () => void;
  isUpdating?: boolean;
};

const ConsultationForm = ({ patient, consultationModel, onSubmit, isUpdating = false }: ConsultationFormProps): JSX.Element => {
  const consultationService = new ConsultationService();

  const [consultation, setConsultation] = useState<Consultation>(consultationModel ?? Consultation.CreateEmpty());

  const validationObjectShape = {
    reason: Yup.string().required('Reason is required'),
    treatment: Yup.string(),
    diagnosis: Yup.string(),
    date: Yup.date().default(new Date()),
    attended: Yup.boolean(),
    isActive: Yup.boolean()
  };

  const handleSubmit = (consultationValues: Consultation) => {
    consultationValues.patient = patient;

    if (!isUpdating) {
      // When creating a new consultation
      consultationService.create(consultationValues).then((cons) => {
        onSubmit();
        new Notification('Consultation Created Successfully', {
          body: `A new consultation for ${cons.patient?.name} has been registered`
        });
      });
    } else {
      // When updating an existing one
      const consultationToSend: Consultation = {
        ...consultationValues,
        date: consultation.date
      };
      consultationService.update(consultation.id ?? -1, consultationToSend).then(() => {
        onSubmit();
        new Notification('Consultation Updated Successfully');
      });
    }
  };

  return (
    <Formik initialValues={consultation} validationSchema={Yup.object().shape(validationObjectShape)} onSubmit={handleSubmit}>
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
                value={values.reason}
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
                value={values.treatment}
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
                value={values.diagnosis}
                description="Patient's diagnosis"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched?.diagnosis && errors?.diagnosis)}
                errorHelperText={errors?.diagnosis}
              />
            </Grid>
            {isUpdating && (
              <>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <MuiDatePicker
                    label="Date"
                    initialValue={values.date}
                    onNewDateAssigned={(newDate) => setConsultation({ ...consultation, date: newDate })}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    label="Attended?"
                    control={
                      <Checkbox
                        id="attended-step"
                        name="attended"
                        defaultChecked={consultation?.attended ?? false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    label="Is Active?"
                    control={
                      <Checkbox
                        id="active-step"
                        name="isActive"
                        defaultChecked={consultation?.isActive ?? false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                  />
                </Grid>
              </>
            )}
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
