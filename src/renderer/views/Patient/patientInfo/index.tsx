import React, { useEffect, useState } from 'react';
// material-ui
import { Box, Button, FormControlLabel, Grid, Typography, Checkbox } from '@mui/material';
import styles from '../styles.module.scss';

// project imports
import MainCard from 'renderer/_TEMPLATE/ui-component/cards/MainCard';
import { Patient } from 'shared/database/entities/Patient';
import { useNavigate, useParams } from 'react-router';
import { IconChevronLeft, IconPencil, IconPlus } from '@tabler/icons';
import AnimateButton from 'renderer/_TEMPLATE/ui-component/extended/AnimateButton';
import PatientForm from '../components/PatientForm';
import DialogContainer, { DialogContainerRef } from 'renderer/_TEMPLATE/ui-component/DialogContainer';
import ConsultationForm from 'renderer/views/Consultation/components/ConsultationForm';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Consultation } from 'shared/database/entities/Consultation';
import FloatingButton from 'renderer/_TEMPLATE/ui-component/FloatingButton';
import PatientService from 'renderer/services/PatientService';
import ConsultationService from 'renderer/services/ConsultationService';
import { trans } from 'renderer/utils/localization';

// ==============================|| SAMPLE PAGE ||============================== //

const PatientInfoPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const patientService = new PatientService();
  const consultationService = new ConsultationService();

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
    patientService.getById(Number(id)).then((patient: Patient) => setPatient(patient));
  };

  const requestPatientConsultations = () => {
    consultationService.getByPatientId(Number(id)).then((consultations: Consultation[]) => {
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
    patientService.update(Number(id), newPatientValues).then(() => requestPatient());
  };

  const onNewConsultationSubmitted = () => {
    dialogContainerRef.current?.Close();
    requestPatientConsultations();
  };

  const getRowClassName = (
    params: GridRowParams<{
      [key: string]: boolean;
    }>
  ) => {
    if (params.row.attended) {
      return styles.attended;
    }

    if (!params.row.isActive) {
      return styles.cancelled;
    }

    return '';
  };

  const formatDate = (dateAsString?: string): string => {
    return `${new Date(dateAsString ?? '-').toLocaleDateString(['en', 'es'], { timeZone: 'UTC' }) || '-'}`;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: trans('id'), width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
    { field: 'attended', headerName: trans('attended'), type: 'boolean', hide: true },
    { field: 'isActive', headerName: trans('is active'), type: 'boolean', hide: true },
    {
      field: 'date',
      headerName: trans('date'),
      type: 'date',
      valueGetter: (params: GridValueGetterParams) => formatDate(params.row.date?.toString()),
      minWidth: 100,
      flex: 0.4
    },
    { field: 'reason', headerName: trans('reason'), flex: 1, minWidth: 200 },
    { field: 'treatment', headerName: trans('treatment'), flex: 1, minWidth: 200 },
    { field: 'diagnosis', headerName: trans('diagnosis'), flex: 1, minWidth: 200 }
  ];

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
                <Box sx={{ flexDirection: 'row-reverse' }}>
                  <Button variant="contained" onClick={onAddConsultationClicked} sx={{ mb: 3 }}>
                    {<IconPlus />} &nbsp; {trans('add_consultation')}
                  </Button>
                  <FormControlLabel
                    label={trans("Is_Active")}
                    control={
                      <Checkbox
                        checked={patient?.isActive ?? true}
                        onChange={(event) => {
                          setPatient(patient ? { ...patient, isActive: event.target.checked } : Patient.Empty);
                        }}
                      />
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
              <DataGrid
                sx={{ height: '40vh' }}
                rows={consultations ?? []}
                columns={columns}
                rowHeight={100}
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
        title={trans("edit_patient")}
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
