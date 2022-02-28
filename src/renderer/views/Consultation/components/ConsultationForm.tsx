import { Box, Button, Grid, Step, StepLabel, Stepper, TextareaAutosize, Typography } from '@mui/material';
import { IconCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useState } from 'react';
import MuiFormControl from 'renderer/ui-component/forms/MuiFormControl';
import { Consultation } from 'shared/database/entities/Consultation';

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
// ==================== STEPS ==========================
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

// ==================== CHECK STEP ==========================
const CheckNewConsultation = (consultation: Consultation): JSX.Element => {
  console.log(consultation)
  return (
    <>
      <Box sx={{ px: 4, mb: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Check Consultation
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="subtitle1" gutterBottom component="span" color="#6a6a6a">
            Reason
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <MuiFormControl type="text" label="" defaultValue={consultation.reason} fullWidth multiline rows={5} disabled />
        </Grid>
        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="subtitle1" gutterBottom component="span" color="#6a6a6a">
            Treatment
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <MuiFormControl type="text" label="" defaultValue={consultation.treatment} fullWidth multiline rows={5} disabled />
        </Grid>
        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="subtitle1" gutterBottom component="span" color="#6a6a6a">
            Diagnosis
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <MuiFormControl type="text" label="" defaultValue={consultation.diagnosis} fullWidth multiline rows={5} disabled />
        </Grid>
      </Grid>
    </>
  );
};

// ==================== FORM ==========================
type ConsultationFormProps = {
  onSubmit: () => void;
};

type FormStep = {
  label: string;
  node: (
    onBlur?: (e: React.FocusEvent<any, Element>) => void,
    onChange?: (e: React.ChangeEvent<any>) => void,
    touched?: FormikTouched<Consultation>,
    errors?: FormikErrors<Consultation>,
    consultation?: Consultation
  ) => React.ReactNode;
};

const ConsultationForm = ({ onSubmit }: ConsultationFormProps): JSX.Element => {
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
            ((e) => {
              console.error('Reason Blur not implemented');
            }),
          onChange:
            onChange ??
            ((e) => {
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
            ((e) => {
              console.error('Treatment Blur not implemented');
            }),
          onChange:
            onChange ??
            ((e) => {
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
            ((e) => {
              console.error('Diagnosis Blur not implemented');
            }),
          onChange:
            onChange ??
            ((e) => {
              console.error('Diagnosis Change not implemented');
            }),
          error: Boolean(touched?.diagnosis && errors?.diagnosis),
          errorHelperText: errors?.diagnosis
        })
    },
    {
      label: 'Check Consultation',
      node: (onBlur, onChange, touched, errors, consultation) => CheckNewConsultation(consultation ?? Consultation.Empty)
    }
  ];
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [consultation, setConsultation] = useState<Consultation>(Consultation.Empty);

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
    console.log(newConsultation);
    onSubmit();
  };

  /* 
  reason: string;
  date: Date;
  treatment?: string;
  diagnosis?: string; 
  */
  return (
    <Formik initialValues={consultation} onSubmit={handleSubmit}>
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

export default ConsultationForm;
