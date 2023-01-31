import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowParams, GridSelectionModel, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { IconPencil } from '@tabler/icons';
import AddPatientFloatingButton from '../components/AddPatientFloatingButton';
import MainCard from 'renderer/_TEMPLATE/ui-component/cards/MainCard';
import { Patient } from 'shared/database/entities/Patient';
import FloatingButton from 'renderer/_TEMPLATE/ui-component/FloatingButton';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.scss';
import { trans } from 'renderer/utils/localization';
import { usePatientService } from 'renderer/hooks';

type SelectedPatientInfo = {
  id: number;
  name?: string;
};

const PatientsPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { getAll } = usePatientService();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<SelectedPatientInfo>({ id: -1 });

  useEffect(() => {
    requestPatients();
  }, []);

  const requestPatients = () => {
    getAll().then((allPatients) => setPatients(allPatients));
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    if (!selectionModel.length) {
      setSelectedPatient({ id: -1 });
      console.log('cancel');
    }
  };

  const onRowClick = (
    params: GridRowParams<{
      // eslint-disable-next-line
      [key: string]: any;
    }>
  ) => {
    setSelectedPatient({
      id: params.row.id,
      name: params.row.name
    });
  };

  const onEditButtonClicked = () => {
    navigate(`/patients/${selectedPatient.id}`);
  };

  const formatDate = (dateAsString?: string): string => {
    return `${new Date(dateAsString ?? '-').toLocaleDateString(['en', 'es'], { timeZone: 'UTC' }) || '-'}`;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: trans('id'), width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
    { field: 'isActive', headerName: trans('active'), type: 'boolean', hide: true /*flex: .3,  minWidth: 30*/ },
    { field: 'name', headerName: trans('name'), flex: 1, minWidth: 200 },
    {
      field: 'birthDate',
      headerName: trans('birth_date'),
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams) => formatDate(params.value?.toString()),
      valueGetter: (params: GridValueGetterParams) => formatDate(params.row.birthDate?.toString()),
      minWidth: 120,
      flex: 1
    },
    { field: 'phone', headerName: trans('telephone'), flex: 0.7, minWidth: 130 },
    { field: 'email', headerName: trans('email'), flex: 1, minWidth: 200 },
    // { field: 'weight', headerName: trans('weight'), flex: 0.3, type: 'number', minWidth: 70 },
    // { field: 'height', headerName: trans('height'), flex: 0.3, type: 'number', minWidth: 70 },
    // { field: 'headCircumference', headerName: trans('hc'), flex: 0.3, type: 'number', minWidth: 70 },
    // { field: 'bloodPressure', headerName: trans('blood_pressure'), flex: 0.3, type: 'number', minWidth: 150 }
  ];

  return (
    <>
      <MainCard
        title={`${trans('patients')} ${selectedPatient.id !== -1 ? '- ' + selectedPatient.name : ''}`}
        sx={{ width: '100%', height: '100%' }}
        contentSX={{ height: '85%' }}
      >
        {patients && ( // If there are any patients
          <DataGrid
            rows={patients ?? []}
            columns={columns}
            pageSize={5}
            onSelectionModelChange={onSelectionModelChange}
            rowsPerPageOptions={[5]}
            onRowClick={onRowClick}
            onRowDoubleClick={(params) => navigate(`/patients/${params.row.id}`)}
            getRowClassName={(params) => (params.row.isActive ? '' : styles.cancelled)}
          />
        )}
      </MainCard>
      <AddPatientFloatingButton onFormSubmitted={requestPatients} />
      <FloatingButton
        title={trans("edit_patient")}
        onClick={onEditButtonClicked}
        childContent={<IconPencil />}
        styles={{
          backgroundColor: '#2196f3',
          bottom: '10%',
          display: selectedPatient.id !== -1 ? 'block' : 'none',
          '&: hover': {
            backgroundColor: '#1e88e5'
          }
        }}
      />
    </>
  );
};

export default PatientsPage;
