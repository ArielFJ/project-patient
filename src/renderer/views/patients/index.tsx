import React, { useEffect, useState } from 'react';
import MainCard from 'renderer/ui-component/cards/MainCard';
import AddPatientFloatingButton from './components/AddPatientFloatingButton';
import { Patient } from 'shared/database/entities/Patient';
const { ipcRenderer } = window.require('electron');
import Channels from 'shared/ipcChannels';
import SearchSection from 'renderer/layout/MainLayout/Header/SearchSection';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';

const Patients: React.FC = (): JSX.Element => {
  const [patients, setPatients] = useState<Patient[] | null>(null);

  useEffect(() => {
    ipcRenderer.invoke(Channels.patient.getAll).then(setPatients);
  }, []);

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70, type: 'number', /*flex: .3,*/ minWidth: 30 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      valueFormatter: (params: GridValueFormatterParams) => `${new Date(params.value?.toString() ?? '').toLocaleDateString() || '-'}`,
      minWidth: 120,
      // TODO: check if there's a way to modify the way it filters data
      flex: 1
    },
    { field: 'phone', headerName: 'Telephone', flex: 0.7, minWidth: 130 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'weight', headerName: 'Weight', flex: 0.3, type: 'number', minWidth: 70 },
    { field: 'height', headerName: 'Height', flex: 0.3, type: 'number', minWidth: 70 },
    { field: 'headCircunference', headerName: 'HC', flex: 0.3, type: 'number', minWidth: 70 },
    { field: 'bloodPressure', headerName: 'Blood Pressure', flex: 0.3, type: 'number', minWidth: 150 }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', margin: '0 0 14px' }}>
        <SearchSection searchBoxBackground="transparent" borderColor="#ccc" openFromRight />
      </Box>
      <MainCard title="Patients" sx={{ width: '100%', height: 'calc(100% - 70px)' }} contentSX={{ height: '85%' }}>
        {patients && ( // If there are any patients
          <DataGrid
            rows={patients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={(params, e, details) => {
              console.log(params.row);
            }}
          />
        )}
      </MainCard>
      <AddPatientFloatingButton />
    </>
  );
};

export default Patients;
