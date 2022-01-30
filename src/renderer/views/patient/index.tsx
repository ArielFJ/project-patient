import React from 'react';
// material-ui
import { Button } from '@mui/material';

// project imports
import MainCard from 'renderer/ui-component/cards/MainCard';
import { useNavigate, useParams } from 'react-router';

// ==============================|| SAMPLE PAGE ||============================== //

const Patient: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <MainCard title="Patient">
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        {id}
      </MainCard>
    </>
  );
};

export default Patient;
