import { FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import React from 'react';

type MuiFormControlProps = {
  id: string;
  label: string;
  type?: string;
  name: string;
  error: boolean;
  fullWidth: boolean;
  multiline?: boolean;
  rows?: number;
  defaultValue?: string | Date | number;
  errorHelperText?: string;
  // eslint-disable-next-line
  onBlur: (event: React.FocusEvent<any, Element>) => void;
  // eslint-disable-next-line
  onChange: (event: React.ChangeEvent<any>) => void;
};

function MuiFormControl({
  id,
  label,
  type = 'text',
  name,
  error,
  fullWidth = true,
  multiline = false,
  rows = 0,
  defaultValue,
  errorHelperText,
  onBlur,
  onChange
}: MuiFormControlProps): JSX.Element {
  const theme = useTheme();

  return (
    <FormControl
      fullWidth={fullWidth}
      size="small"
      error={error}
      sx={{
        ...theme.typography.customInput,
        marginTop: 0,
        '& > div > input': {
          padding: '24px 12px 8px !important'
        }
      }}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        key={id}
        id={id}
        type={type}
        value={defaultValue}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        label={label}
        multiline={multiline}
        rows={rows}
        inputProps={{}}
      />
      {/* <TextField
        key={id}
        id={id}
        type={type}
        defaultValue={defaultValue}
        name={name}
        onBlur={onBlur}
        helperText={errorHelperText}
        onChange={onChange}
        label={label}
        error={error}
        fullWidth={fullWidth}
      /> */}
      {error && <FormHelperText error>{errorHelperText}</FormHelperText>}
    </FormControl>
  );
}

export default MuiFormControl;
