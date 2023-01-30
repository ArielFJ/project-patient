import React, { MouseEvent, useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

// third party
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

// project imports
import AnimateButton from 'renderer/_TEMPLATE/ui-component/extended/AnimateButton';

// assets
import MuiFormControl from 'renderer/_TEMPLATE/ui-component/forms/MuiFormControl';
import { Insurance, InsuranceType } from 'shared/database/entities';
import { useInsuranceTypeService } from 'renderer/hooks';
import AddTypeField from './AddTypeField';
import { openDeleteModal } from '../../../utils/helpers';
import { trans } from 'renderer/utils/localization';

type Props = {
  defaultInsurance?: Insurance;
  onSubmit: (values: Insurance) => void;
};

const InsuranceForm = ({ defaultInsurance, onSubmit }: Props): JSX.Element => {
  const { getAll, remove } = useInsuranceTypeService();
  const insurance = defaultInsurance ?? Insurance.Empty();
  const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);

  const requestTypes = async () => {
    const data = await getAll();
    setInsuranceTypes([...data]);
  };

  useEffect(() => {
    requestTypes();
  }, []);

  const validationObjectShape = {
    name: Yup.string().max(255).required(`${trans('name')} ${trans('is_required')}`),
    types: Yup.array().min(1, `${trans('types')} ${trans('is_required')}`).required(`${trans('types')} ${trans('is_required')}`)
  };

  const onTypeChanged = (
    event: SelectChangeEvent<(number | undefined)[]>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ) => {
    const {
      target: { value }
    } = event;
    const types = (value as number[]).map((v) => insuranceTypes.find((t) => t.id === v));
    setFieldValue('types', types);
  };

  const onTypeDelete = (e: MouseEvent, typeId?: number) => {
    e.stopPropagation();
    if (!typeId) return;

    const handleDelete = async () => {
      console.log(typeId);
      await remove(typeId);
      await requestTypes();
    }

    openDeleteModal('type', handleDelete);
  };

  const handleSubmit = (values: Insurance, formikHelpers: FormikHelpers<Insurance>) => {
    onSubmit(values);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={insurance} validationSchema={Yup.object().shape(validationObjectShape)} onSubmit={handleSubmit}>
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container gap={2} justifyContent="center">
            <Grid item xs={6}>
              <MuiFormControl
                id="name-input"
                label={trans("name")}
                name="name"
                defaultValue={values.name}
                error={Boolean(touched.name && errors.name)}
                errorHelperText={errors.name}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="types-input-label">{trans("types")}</InputLabel>
                <Select
                  labelId="types-input-label"
                  id="types-input"
                  name="types"
                  multiple
                  renderValue={(selected) => (selected?.map((id) => insuranceTypes.find((t) => t.id === id)?.name) as string[]).join(', ')}
                  input={<OutlinedInput label={trans("types")} />}
                  value={values.types.map((t) => t.id)}
                  fullWidth
                  onChange={(e) => onTypeChanged(e, setFieldValue)}
                  onBlur={handleBlur}
                  error={Boolean(touched.types && errors.types)}
                >
                  {insuranceTypes?.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                        <Box display="flex" alignItems="center">
                          <Checkbox checked={!!values.types.find(t => t.id === type.id)} />
                          <ListItemText primary={type.name} />
                        </Box>
                        <IconButton onClick={(e) => onTypeDelete(e, type.id)}>
                          <Close />
                        </IconButton>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {Boolean(touched.types && errors.types) && <FormHelperText error>{errors.types?.toString()}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={4}>
              <AddTypeField onAdd={requestTypes} />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
              {trans("submit")}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default InsuranceForm;
