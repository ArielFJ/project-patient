import { useTheme } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { IconPlus, IconX } from '@tabler/icons';
import AddPatientForm from './AddPatientForm';

/* ============== DIALOG ACTIONS ============== */

const AddPatientDialogActions = ({ onClose }: { onClose: () => void }): JSX.Element => {
  return (
    <DialogActions>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <IconX />
      </IconButton>
    </DialogActions>
  );
};

/* ============== DIALOG ============== */

type FloatingButtonProps = {
  onClick?: () => void;
};

const AddPatientFloatingButton = ({ onClick }: FloatingButtonProps): JSX.Element => {
  const theme = useTheme();
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleClick = () => {
    setDialogOpened(true);
  };

  const handleClose = () => {
    setDialogOpened(false);
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
      <Dialog open={dialogOpened} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Add Patient</DialogTitle>
        <AddPatientDialogActions onClose={handleClose} />
        <DialogContent>
          <AddPatientForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPatientFloatingButton;
