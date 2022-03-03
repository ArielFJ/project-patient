import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { IconCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useState } from 'react';
import MuiFormControl from 'renderer/ui-component/forms/MuiFormControl';
import { Consultation } from 'shared/database/entities/Consultation';
import { Patient } from 'shared/database/entities/Patient';
import Channels from 'shared/ipcChannels';
import ConsultationForm from './ConsultationForm';
const { ipcRenderer } = window.require('electron');

type StepProps = {
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
// ==================== FORM STEPS ==========================
type FormStep = {
  label: string;
  node: (
    // eslint-disable-next-line
    onBlur?: (e: React.FocusEvent<any, Element>) => void,
    // eslint-disable-next-line
    onChange?: (e: React.ChangeEvent<any>) => void,
    touched?: FormikTouched<Consultation>,
    errors?: FormikErrors<Consultation>,
    consultation?: Consultation
  ) => React.ReactNode;
};

const formSteps: FormStep[] = [
  {
    label: 'Reason',
    node: (onBlur, onChange, touched, errors) =>
      FormStepUI({
        id: 'reason-step',
        name: 'reason',
        description: "Patient's reason",
        onBlur:
          onBlur ??
          (() => {
            console.error('Reason Blur not implemented');
          }),
        onChange:
          onChange ??
          (() => {
            console.error('Reason Change not implemented');
          }),
        error: Boolean(touched?.reason && errors?.reason),
        errorHelperText: errors?.reason
      })
  },
  {
    label: 'Treatment',
    node: (onBlur, onChange, touched, errors) =>
      FormStepUI({
        id: 'treatment-step',
        name: 'treatment',
        description: "Patient's selected treatment",
        onBlur:
          onBlur ??
          (() => {
            console.error('Treatment Blur not implemented');
          }),
        onChange:
          onChange ??
          (() => {
            console.error('Treatment Change not implemented');
          }),
        error: Boolean(touched?.treatment && errors?.treatment),
        errorHelperText: errors?.treatment
      })
  },
  {
    label: 'Diagnosis',
    node: (onBlur, onChange, touched, errors) =>
      FormStepUI({
        id: 'diagnosis-step',
        name: 'diagnosis',
        description: "Patient's diagnosis",
        onBlur:
          onBlur ??
          (() => {
            console.error('Diagnosis Blur not implemented');
          }),
        onChange:
          onChange ??
          (() => {
            console.error('Diagnosis Change not implemented');
          }),
        error: Boolean(touched?.diagnosis && errors?.diagnosis),
        errorHelperText: errors?.diagnosis
      })
  },
  // {
  //   label: 'Check Consultation',
  //   node: (onBlur, onChange, touched, errors, consultation) =>
  //     ConsultationForm({ consultation: consultation ?? Consultation.CreateEmpty() })
  // }
];

const FormStepUI = ({ id, description, name, error, errorHelperText, onBlur, onChange }: StepProps): JSX.Element => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ px: 4 }}>
          <Typography variant="subtitle1" gutterBottom component="div">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
          <MuiFormControl
            id={id}
            type="text"
            label=""
            name={name}
            error={error}
            errorHelperText={errorHelperText}
            fullWidth
            multiline
            rows={5}
            onBlur={onBlur}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

// ==================== FORM ==========================
type ConsultationStepperFormProps = {
  patient?: Patient;
  onSubmit: () => void;
};

const ConsultationStepperForm = ({ patient, onSubmit }: ConsultationStepperFormProps): JSX.Element => {
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  // eslint-disable-next-line
  const [consultation, setConsultation] = useState<Consultation>(Consultation.CreateEmpty());

  useEffect(() => {
    setTimeout(() => setShouldSubmit(currentStep === formSteps.length - 1), 100);
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep((prevCurrentStep) => Math.min(prevCurrentStep + 1, formSteps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prevCurrentStep) => Math.max(prevCurrentStep - 1, 0));
  };

  const handleSubmit = (newConsultation: Consultation) => {
    newConsultation.patient = patient;
    console.log(newConsultation)
    // ipcRenderer.invoke(Channels.consultation.create, newConsultation).then(
    //   (consultation) =>
    //     new Notification('Consultation Created Successfully', {
    //       body: `A new consultation for ${consultation.patient.name} has been registered`
    //     })
    // );
    onSubmit();
  };

  return (
    <Formik initialValues={consultation} onSubmit={handleSubmit}>
      {/* eslint-disable-next-line */}
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Stepper>
            {formSteps.map((step, index) => {
              return (
                <Step key={index} completed={currentStep > index} active={currentStep === index}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {formSteps[currentStep].node(handleBlur, handleChange, touched, errors, values)}

          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Button disabled={currentStep === 0} onClick={handleBack}>
              <IconChevronLeft /> &nbsp; Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} /> {/* Create horizontal space */}
            {!shouldSubmit ? (
              <Button onClick={handleNext}>
                Next &nbsp; <IconChevronRight />
              </Button>
            ) : (
              <Button type="submit" sx={{ color: '#009988' }}>
                Finish &nbsp; <IconCheck />
              </Button>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ConsultationStepperForm;
