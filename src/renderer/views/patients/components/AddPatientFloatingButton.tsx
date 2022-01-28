import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { IconPlus, IconX } from '@tabler/icons';
import AddPatientForm from './AddPatientForm';
import FloatingButton from 'renderer/ui-component/FloatingButton';

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

type AddPatientFloatingButtonProps = {
  onFormSubmitted: () => void;
};

const AddPatientFloatingButton = ({ onFormSubmitted }: AddPatientFloatingButtonProps): JSX.Element => {
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleClick = () => {
    setDialogOpened(true);
  };

  const handleClose = () => {
    setDialogOpened(false);
  };

  const handleSubmit = () => {
    onFormSubmitted();
    handleClose();
  }

  return (
    <>
      <FloatingButton title='Add Patient' onClick={handleClick} childContent={<IconPlus />}  />
      <Dialog open={dialogOpened} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Add Patient</DialogTitle>
        <AddPatientDialogActions onClose={handleClose} />
        <DialogContent>
          <AddPatientForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPatientFloatingButton;
