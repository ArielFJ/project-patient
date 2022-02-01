import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridSelectionModel, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { IconTrash } from '@tabler/icons';
import AddPatientFloatingButton from './components/AddPatientFloatingButton';
import MainCard from 'renderer/ui-component/cards/MainCard';
import { deletePatientsWithIdAsync, requestPatientsAsync } from 'renderer/store/patients/patientSlice';
import { useAppDispatch } from 'renderer/store/hooks';
import { Patient } from 'shared/database/entities/Patient';
import FloatingButton from 'renderer/ui-component/FloatingButton';
import { useNavigate } from 'react-router';
import { patientsSelector } from 'renderer/store/patients/selectors';
const  { ipcRenderer } = window.require('electron');
import Channels from 'shared/ipcChannels';

const Patients: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const patients: Patient[] = useSelector(patientsSelector);
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);

  useEffect(() => {
    requestPatients();
  }, []);

  const requestPatients = () => {
    dispatch(requestPatientsAsync());
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    const IDs = selectionModel.map((value) => Number(value));
    setSelectedPatients(IDs);
  };

  const onDeleteButtonClicked = () => {
    const options: Electron.MessageBoxOptions = {
      title: 'Warning',
      message: 'Are you sure to delete?',
      buttons: ['Yes', 'Later']
    }
    ipcRenderer.invoke(Channels.dialog.confirm, options)
      .then((value: Electron.MessageBoxReturnValue) => {
        if (value.response === 0)
          dispatch(deletePatientsWithIdAsync(selectedPatients)).then(() => requestPatients());
      })
  };

  const formatDate = (dateAsString?: string): string => {
    return `${new Date(dateAsString ?? '-').toLocaleDateString(['en', 'es'], {timeZone: 'UTC'}) || '-'}`
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams) => formatDate(params.value?.toString()),
      valueGetter: (params: GridValueGetterParams) => formatDate(params.row.birthDate?.toString()),
      minWidth: 120,
      // TODO: check if there's a way to modify the way it filters data
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
      <MainCard title="Patients" sx={{ width: '100%', height: '100%' }} contentSX={{ height: '85%' }}>
        {patients && ( // If there are any patients
          <DataGrid
            rows={patients ?? []}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={onSelectionModelChange}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            // eslint-disable-next-line
            // onRowClick={(params, e, details) => {
            //   console.log(params.row);
            // }}
            onRowDoubleClick={(params) => {
              console.log(params.row.id);
              navigate(`patients/${params.row.id}`);
            }}
          />
        )}
      </MainCard>
      <AddPatientFloatingButton onFormSubmitted={requestPatients} />
      <FloatingButton
        title="Delete Patients"
        onClick={onDeleteButtonClicked}
        childContent={<IconTrash />}
        styles={{
          backgroundColor: '#ba3434',
          bottom: '10%',
          display: selectedPatients.length ? 'block' : 'none',
          '&: hover': {
            backgroundColor: '#c93434'
          }
        }}
      />
    </>
  );
};

export default Patients;

