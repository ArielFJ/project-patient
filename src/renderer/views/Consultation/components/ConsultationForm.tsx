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
// ==================== STEP 1 ==========================
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

// ==================== STEP 2 ==========================
const TreatmentStep = (): JSX.Element => {
  return <h1>Treatment</h1>;
};

// ==================== STEP 3 ==========================
const DiagnosisStep = (): JSX.Element => {
  return <h1>Diagnosis</h1>;
};

// ==================== FORM ==========================
type ConsultationFormProps = {
  onSubmit: () => void;
};

type FormStep = {
  label: string;
  node: (
    onBlur: (e: React.FocusEvent<any, Element>) => void,
    onChange: (e: React.ChangeEvent<any>) => void,
    touched: FormikTouched<Consultation>,
    errors: FormikErrors<Consultation>
  ) => React.ReactNode;
};

const ConsultationForm = ({ onSubmit }: ConsultationFormProps): JSX.Element => {
  const formSteps: FormStep[] = [
    {
      label: 'Reason',
      node: (onBlur, onChange, touched, errors) =>
        FormStepUI({
          id: 'reason-step',
          name: 'reasonStep',
          description: "Patient's reason",
          onBlur,
          onChange,
          error: Boolean(touched.reason && errors.reason),
          errorHelperText: errors.reason
        })
    },
    {
      label: 'Treatment',
      node: (onBlur, onChange, touched, errors) =>
        FormStepUI({
          id: 'treatment-step',
          name: 'treatmentStep',
          description: "Patient's selected treatment",
          onBlur,
          onChange,
          error: Boolean(touched.treatment && errors.treatment),
          errorHelperText: errors.treatment
        })
    },
    {
      label: 'Diagnosis',
      node: (onBlur, onChange, touched, errors) =>
        FormStepUI({
          id: 'diagnosis-step',
          name: 'diagnosisStep',
          description: "Patient's diagnosis",
          onBlur,
          onChange,
          error: Boolean(touched.diagnosis && errors.diagnosis),
          errorHelperText: errors.diagnosis
        })
    },
    {
      label: 'Check Consultation',
      node: (onBlur, onChange, touched, errors) => (
        <h1>Checking</h1>
      )
    }
  ];
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [consultation, setConsultation] = useState<Consultation>(Consultation.Empty);

  useEffect(() => {
    setShouldSubmit(currentStep === formSteps.length - 1);
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

          {formSteps[currentStep].node(handleBlur, handleChange, touched, errors)}

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
