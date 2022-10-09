import React from 'react';
import { Insurance } from 'shared/database/entities';
import { TableCell, TableHead, Table, TableBody, TableRow, Button, Box, Grid } from '@mui/material';

type Props = {
  insurances: Insurance[];
};

function InsurancesList({ insurances }: Props): JSX.Element {
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
                    <Button variant="contained" color="error">
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
