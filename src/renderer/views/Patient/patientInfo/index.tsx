import React, { useEffect, useState } from 'react';
// material-ui
import { Box, Button, FormControlLabel, Grid, Typography, Checkbox } from '@mui/material';

// project imports
import MainCard from 'renderer/_TEMPLATE/ui-component/cards/MainCard';
import { Patient } from 'shared/database/entities/Patient';
import { useNavigate, useParams } from 'react-router';
import { IconChevronLeft, IconPencil, IconPlus } from '@tabler/icons';
import AnimateButton from 'renderer/_TEMPLATE/ui-component/extended/AnimateButton';
import PatientForm from '../components/PatientForm';
import DialogContainer, { DialogContainerRef } from 'renderer/_TEMPLATE/ui-component/DialogContainer';
import ConsultationForm from 'renderer/views/Consultation/components/ConsultationForm';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { Consultation } from 'shared/database/entities/Consultation';
import FloatingButton from 'renderer/_TEMPLATE/ui-component/FloatingButton';
import { trans } from 'renderer/utils/localization';
import { columns, getRowClassName } from './formDefinition';
import { useConsultationService, usePatientService } from 'renderer/hooks';

// ==============================|| SAMPLE PAGE ||============================== //

const PatientInfoPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { getById, update } = usePatientService();
  const { getByPatientId } = useConsultationService();

  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isUpdatingConsultation, setIsUpdatingConsultation] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | undefined>();
  const dialogContainerRef = React.useRef<DialogContainerRef>(null);

  useEffect(() => {
    requestPatient();
    requestPatientConsultations();
    return () => {
      setPatient(undefined);
    };
  }, []);

  const requestPatient = () => {
    getById(Number(id)).then((patient: Patient) => setPatient(patient));
  };

  const requestPatientConsultations = () => {
    getByPatientId(Number(id)).then((consultations: Consultation[]) => {
      setConsultations(consultations);
    });
  };

  const onAddConsultationClicked = () => {
    setSelectedConsultation(undefined);
    setIsUpdatingConsultation(false);
    dialogContainerRef.current?.Open();
  };

  const onEditConsultationClicked = (params: GridRowParams) => {
    // Parse GridRowParams properties into an object of type Consultation
    setSelectedConsultation({ ...Object.assign(new Consultation(), params.row), patient });
    setIsUpdatingConsultation(true);
    // dialogContainerRef.current?.Open();
  };

  const onPatientUpdateSubmitted = (patientToUpdate: Patient) => {
    const newPatientValues: Patient = { ...patientToUpdate, isActive: patient?.isActive ?? true };
    update(Number(id), newPatientValues).then(() => requestPatient());
  };

  const onNewConsultationSubmitted = () => {
    dialogContainerRef.current?.Close();
    requestPatientConsultations();
  };

  const onIsActiveChange = (checked: boolean) => {
    setPatient(patient ? { ...patient, isActive: checked } : Patient.Empty);

    if (!patient) return;
    update(Number(id), { ...patient, isActive: checked });
  };

  const title = (additionalTitle?: string): JSX.Element => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AnimateButton scale={1.5}>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            color: 'black'
          }}
        >
          <IconChevronLeft />
        </Button>
      </AnimateButton>
      <Typography variant="h4">
        {trans('patient')} &nbsp; {additionalTitle && <>| &nbsp; {additionalTitle}</>}
      </Typography>
    </Box>
  );

  return (
    <>
      <MainCard title={title(patient?.name)}>
        {patient && (
          <>
            <Grid container>
              <Grid item xs={9}>
                <PatientForm defaultPatient={patient} onSubmit={onPatientUpdateSubmitted} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={2}>
                <Box sx={{ display:'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button variant="contained" onClick={onAddConsultationClicked} sx={{ mb: 3 }}>
                    {<IconPlus />} &nbsp; {trans('add_consultation')}
                  </Button>
                  <FormControlLabel
                    label={trans('Is_Active')}
                    control={<Checkbox checked={patient?.isActive ?? true} onChange={(_, checked) => onIsActiveChange(checked)} />}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
              <DataGrid
                sx={{ height: '40vh' }}
                rows={consultations ?? []}
                columns={columns}
                rowHeight={40}
                onRowClick={onEditConsultationClicked}
                getRowClassName={getRowClassName}
                onRowDoubleClick={() => dialogContainerRef.current?.Open()}
              />
            </Box>
          </>
        )}
      </MainCard>

      <DialogContainer title={isUpdatingConsultation ? trans('update_consultation') : trans('new_consultation')} ref={dialogContainerRef}>
        <ConsultationForm
          patient={patient}
          onSubmit={onNewConsultationSubmitted}
          consultationModel={selectedConsultation}
          isUpdating={isUpdatingConsultation}
        />
      </DialogContainer>

      <FloatingButton
        title={trans('edit_patient')}
        onClick={() => dialogContainerRef.current?.Open()}
        childContent={<IconPencil />}
        styles={{
          backgroundColor: '#2196f3',
          display: selectedConsultation ? 'block' : 'none',
          '&: hover': {
            backgroundColor: '#1e88e5'
          }
        }}
      />
    </>
  );
};

export default PatientInfoPage;
