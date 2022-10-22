import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { IconPlus, IconX } from '@tabler/icons';
import FloatingButton from 'renderer/_TEMPLATE/ui-component/FloatingButton';
import InsuranceForm from './InsuranceForm';
import { Insurance } from 'shared/database/entities';
import { useInsuranceService } from 'renderer/hooks';

/* ============== DIALOG ACTIONS ============== */

const AddInsuranceDialogActions = ({ onClose }: { onClose: () => void }): JSX.Element => {
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

type Props = {
  onFormSubmitted: () => void;
};

const AddInsuranceButton = ({ onFormSubmitted }: Props): JSX.Element => {
  const { create } = useInsuranceService();
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleClick = () => {
    setDialogOpened(true);
  };

  const handleClose = () => {
    setDialogOpened(false);
  };

  const handleSubmit = async (insurance: Insurance) => {
    await create(insurance);
    setDialogOpened(false);
    onFormSubmitted();
  };

  return (
    <>
      <FloatingButton title="Add Insurance" onClick={handleClick} childContent={<IconPlus />} />
      <Dialog open={dialogOpened} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>Add Insurance</DialogTitle>
        <AddInsuranceDialogActions onClose={handleClose} />
        <DialogContent>
          <InsuranceForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddInsuranceButton;
