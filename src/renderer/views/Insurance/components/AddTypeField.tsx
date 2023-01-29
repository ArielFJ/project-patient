import React, { useState } from 'react';
import { Button, FormControl, Grid, TextField, useTheme } from '@mui/material';
import { useInsuranceTypeService } from 'renderer/hooks';
import { trans } from 'renderer/utils/localization';

function AddTypeField({ onAdd }: { onAdd: () => void }): JSX.Element {
  const theme = useTheme();
  const [newType, setNewType] = useState('');
  const { create } = useInsuranceTypeService();

  const onAddType = async () => {
    if (!newType) return;

    await create({ name: newType });
    setNewType('');
    onAdd();
  };

  return (
    <Grid container>
      <Grid item xs={8}>
        <FormControl
          fullWidth
          size="small"
          sx={{
            ...theme.typography.customInput,
            marginTop: 0,
            '& > div > input': {
              padding: '24px 12px 8px !important'
            }
          }}
        >
          <TextField id="newType" placeholder={trans("new_type")} value={newType} variant="standard" onChange={(e) => setNewType(e.target.value)} />
        </FormControl>
      </Grid>
      <Grid item xs={4} textAlign="center">
        <Button onClick={onAddType}>{trans("add")}</Button>
      </Grid>
    </Grid>
  );
}

export default AddTypeField;
