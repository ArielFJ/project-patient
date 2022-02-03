import React from 'react';
// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'renderer/ui-component/cards/MainCard';

const AddConsultationPage: React.FC = (): JSX.Element => {
  
    return (
      <>
        <MainCard title="Add Consultation" sx={{ width: '100%', height: '100%' }} contentSX={{ height: '85%' }}>
        </MainCard>
      </>
    );
  };

export default AddConsultationPage;
