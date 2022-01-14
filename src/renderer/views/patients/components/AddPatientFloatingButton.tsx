import { useTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, Fab, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { IconPlus } from '@tabler/icons';

type FloatingButtonProps = {
  onClick?: () => void;
};

const AddPatientFloatingButton = ({ onClick }: FloatingButtonProps): JSX.Element => {
  const theme = useTheme();
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleClick = () => {
    setDialogOpened(true);
  };

  return (
    <>
      <Tooltip title="Add Patient">
        <Fab
          component="div"
          onClick={onClick ?? handleClick}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '1%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial
          }}
        >
          <IconButton color="inherit" size="large" disableRipple>
            <IconPlus />
          </IconButton>
        </Fab>
      </Tooltip>
      <Dialog open={dialogOpened} onClose={() => setDialogOpened(false)} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Add Patient</DialogTitle>
      </Dialog>
    </>
  );
};

export default AddPatientFloatingButton;
