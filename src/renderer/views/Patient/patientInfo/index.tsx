import React, { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');
// material-ui
import { Box, Button, FormControlLabel, Grid, Typography, Checkbox } from '@mui/material';
import styles from '../styles.module.scss';

// project imports
import MainCard from 'renderer/ui-component/cards/MainCard';
import { Patient } from 'shared/database/entities/Patient';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch } from 'renderer/store/hooks';
import { updatePatientAsync } from 'renderer/store/patients/asyncThunks';
import { IconChevronLeft, IconPencil, IconPlus } from '@tabler/icons';
import AnimateButton from 'renderer/ui-component/extended/AnimateButton';
import PatientForm from '../components/PatientForm';
import Channels from 'shared/ipcChannels';
import DialogContainer, { DialogContainerRef } from 'renderer/ui-component/DialogContainer';
import ConsultationForm from 'renderer/views/Consultation/components/ConsultationForm';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Consultation } from 'shared/database/entities/Consultation';
import FloatingButton from 'renderer/ui-component/FloatingButton';

// ==============================|| SAMPLE PAGE ||============================== //

const PatientInfoPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isUpdatingConsultation, setIsUpdatingConsultation] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | undefined>();
  const dispatch = useAppDispatch();
  const dialogContainerRef = React.useRef<DialogContainerRef>(null);

  useEffect(() => {
    requestPatient();
    requestPatientConsultations();
    return () => {
      setPatient(undefined);
    };
  }, []);

  const requestPatient = () => {
    ipcRenderer.invoke(Channels.patient.getOne, id).then((patient: Patient) => setPatient(patient));
  };

  const requestPatientConsultations = () => {
    ipcRenderer.invoke(Channels.consultation.getByPatientId, Number(id)).then((consultations: Consultation[]) => {
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
    dispatch(
      updatePatientAsync({
        patientId: Number(id),
        newPatientValues
      })
    ).then(() => requestPatient());
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
    { field: 'id', headerName: 'ID', width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
    { field: 'attended', headerName: 'Attended', type: 'boolean', hide: true },
    { field: 'isActive', headerName: 'Is Active', type: 'boolean', hide: true },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      valueGetter: (params: GridValueGetterParams) => formatDate(params.row.date?.toString()),
      minWidth: 100,
      flex: 0.4
    },
    { field: 'reason', headerName: 'Reason', flex: 1, minWidth: 200 },
    { field: 'treatment', headerName: 'Treatment', flex: 1, minWidth: 200 },
    { field: 'diagnosis', headerName: 'Diagnosis', flex: 1, minWidth: 200 }
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
      <Typography variant="h4">Patient &nbsp; {additionalTitle && <>| &nbsp; {additionalTitle}</>}</Typography>
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
                    {<IconPlus />} &nbsp; Add Consultation
                  </Button>
                  <FormControlLabel
                    label="Is Active?"
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

      <DialogContainer title={isUpdatingConsultation ? 'Update consultation' : 'New Consultation'} ref={dialogContainerRef}>
        <ConsultationForm
          patient={patient}
          onSubmit={onNewConsultationSubmitted}
          consultationModel={selectedConsultation}
          isUpdating={isUpdatingConsultation}
        />
      </DialogContainer>

      <FloatingButton
        title="Edit Patient"
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
