import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridRowParams, GridSelectionModel, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { IconPencil } from '@tabler/icons';
import AddPatientFloatingButton from '../components/AddPatientFloatingButton';
import MainCard from 'renderer/_TEMPLATE/ui-component/cards/MainCard';
import { requestPatientsAsync } from 'renderer/store/patients/asyncThunks';
import { useAppDispatch } from 'renderer/store/hooks';
import { Patient } from 'shared/database/entities/Patient';
import FloatingButton from 'renderer/_TEMPLATE/ui-component/FloatingButton';
import { useNavigate } from 'react-router';
import { patientsSelector } from 'renderer/store/patients/selectors';
import styles from '../styles.module.scss';

type SelectedPatientInfo = {
  id: number;
  name?: string;
};

const PatientsPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const patients: Patient[] = useSelector(patientsSelector);
  const [selectedPatient, setSelectedPatient] = useState<SelectedPatientInfo>({ id: -1 });

  useEffect(() => {
    requestPatients();
  }, []);

  const requestPatients = () => {
    dispatch(requestPatientsAsync());
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
    navigate(`patients/${selectedPatient.id}`);
  };

  const formatDate = (dateAsString?: string): string => {
    return `${new Date(dateAsString ?? '-').toLocaleDateString(['en', 'es'], { timeZone: 'UTC' }) || '-'}`;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
    { field: 'isActive', headerName: 'Active', type: 'boolean', hide: true /*flex: .3,  minWidth: 30*/ },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams) => formatDate(params.value?.toString()),
      valueGetter: (params: GridValueGetterParams) => formatDate(params.row.birthDate?.toString()),
      minWidth: 120,
      flex: 1
    },
    { field: 'phone', headerName: 'Telephone', flex: 0.7, minWidth: 130 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'weight', headerName: 'Weight', flex: 0.3, type: 'number', minWidth: 70 },
    { field: 'height', headerName: 'Height', flex: 0.3, type: 'number', minWidth: 70 },
    { field: 'headCircumference', headerName: 'HC', flex: 0.3, type: 'number', minWidth: 70 },
    { field: 'bloodPressure', headerName: 'Blood Pressure', flex: 0.3, type: 'number', minWidth: 150 }
  ];

  return (
    <>
      <MainCard
        title={`Patients ${selectedPatient.id !== -1 ? '- ' + selectedPatient.name : ''}`}
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
            onRowDoubleClick={(params) => navigate(`patients/${params.row.id}`)}
            getRowClassName={(params) => (params.row.isActive ? '' : styles.cancelled)}
          />
        )}
      </MainCard>
      <AddPatientFloatingButton onFormSubmitted={requestPatients} />
      <FloatingButton
        title="Edit Patient"
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
