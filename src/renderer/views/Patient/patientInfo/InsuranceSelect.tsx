import { Box, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { trans } from 'renderer/utils/localization';
import { Insurance } from 'shared/database/entities';

type Props = {
  defaultValue?: string;
  insurances: Insurance[];
  onChange: (value: string) => void;
};

function InsuranceSelect({ defaultValue, insurances, onChange }: Props): JSX.Element {
  const [options, setOptions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const newOptions = [];
    for (const insurance of insurances) {
      for (const type of insurance.types) {
        newOptions.push({
          id: `${insurance.id}-${type.id}`,
          name: `${insurance.name} ${type.name}`
        });
      }
    }
    setOptions(newOptions);
  }, [insurances]);

  return (
    <FormControl fullWidth>
      <InputLabel id="types-input-label">{trans('insurance')}</InputLabel>
      <Select
        labelId="types-input-label"
        id="types-input"
        name="types"
        renderValue={(selected) => selected}
        input={<OutlinedInput label={trans('types')} />}
        defaultValue={defaultValue}
        fullWidth
        onChange={(e) => onChange((e.target.value as string) ?? '')}
      >
        <MenuItem value="-">
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center">
              <ListItemText primary="-" />
            </Box>
          </Box>
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              <Box display="flex" alignItems="center">
                <ListItemText primary={option.name} />
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default InsuranceSelect;
