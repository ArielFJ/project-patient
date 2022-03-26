import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { IconX } from '@tabler/icons';

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
type DialogContainerProps = {
  title: string;
  children: React.ReactNode;
};

export type DialogContainerRef = {
  Open: () => void;
  Close: () => void;
};

const DialogContainer = forwardRef(({ title, children }: DialogContainerProps, ref: Ref<DialogContainerRef>) => {
  const [dialogOpened, setDialogOpened] = useState(false);

  useImperativeHandle(ref, () => ({ Open, Close }));

  const Open = () => {
    setDialogOpened(true);
  };

  const Close = () => {
    setDialogOpened(false);
  };

  return (
    <>
      <Dialog open={dialogOpened} onClose={Close} maxWidth="lg" fullWidth={true}>
        <DialogTitle>{title}</DialogTitle>
        <AddPatientDialogActions onClose={Close} />
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
});

DialogContainer.displayName = 'DialogContainer';
export default DialogContainer;
