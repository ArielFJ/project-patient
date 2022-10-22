import React from 'react';
import { Insurance } from 'shared/database/entities';
import { TableCell, TableHead, Table, TableBody, TableRow, Button, Grid } from '@mui/material';
import { openDeleteModal } from '../helpers';
import { useInsuranceService } from 'renderer/hooks';

type Props = {
  insurances: Insurance[];
  onUpdate: () => void;
};

function InsurancesList({ insurances, onUpdate }: Props): JSX.Element {
  const { remove } = useInsuranceService();

  const onDelete = (id?: number) => {
    if (!id) return;
    
    const deleteInsurance = async () => {
      await remove(id);
      onUpdate();
    };

    openDeleteModal('insurance', deleteInsurance);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Types</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {insurances?.length > 0 &&
            insurances?.map((insurance) => (
              <TableRow key={insurance.id}>
                <TableCell width="30%">{insurance.name}</TableCell>
                <TableCell width="40%">{insurance.types.map((type) => type.name).join(', ')}</TableCell>
                <TableCell>
                  <Grid container gap={3} justifyContent="end">
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => onDelete(insurance.id)}>
                      Delete
                    </Button>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default InsurancesList;
