import React, { useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';

type MuiDatePickerProps = {
  label: string;
  initialValue: Date;
  onNewDateAssigned: (newValue: Date) => void;
};

function MuiDatePicker({ label, initialValue, onNewDateAssigned }: MuiDatePickerProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date>(initialValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={selectedDate}
        onChange={(newValue) => {
          setSelectedDate(newValue ?? new Date());
          if (newValue) onNewDateAssigned(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default MuiDatePicker;
