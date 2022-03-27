import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { IconPlus, IconX } from '@tabler/icons';
import PatientForm from './PatientForm';
import FloatingButton from 'renderer/_TEMPLATE/ui-component/FloatingButton';
import { Patient } from 'shared/database/entities/Patient';
import Channels from 'shared/ipcChannels';
const { ipcRenderer } = window.require('electron');

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

  const handleSubmit = (newPatient: Patient) => {
    ipcRenderer.invoke(Channels.patient.create, newPatient).then(() => {
      onFormSubmitted();
      handleClose();
    });
  };

  return (
    <>
      <FloatingButton title="Add Patient" onClick={handleClick} childContent={<IconPlus />} />
      <Dialog open={dialogOpened} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Add Patient</DialogTitle>
        <AddPatientDialogActions onClose={handleClose} />
        <DialogContent>
          <PatientForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPatientFloatingButton;
