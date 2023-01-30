import { GridColDef, GridRowParams, GridValueGetterParams } from "@mui/x-data-grid";
import { formatDate } from "renderer/utils/dates";
import { trans } from "renderer/utils/localization";
import styles from '../styles.module.scss';

export const columns: GridColDef[] = [
  { field: 'id', headerName: trans('id'), width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
  { field: 'attended', headerName: trans('attended'), type: 'boolean', hide: true },
  { field: 'isActive', headerName: trans('is active'), type: 'boolean', hide: true },
  {
    field: 'date',
    headerName: trans('date'),
    type: 'date',
    valueGetter: (params: GridValueGetterParams) => formatDate(params.row.date?.toString()),
    minWidth: 100,
    flex: 0.4
  },
  { field: 'reason', headerName: trans('reason'), flex: 1, minWidth: 200 },
  { field: 'treatment', headerName: trans('treatment'), flex: 1, minWidth: 200 },
  { field: 'diagnosis', headerName: trans('diagnosis'), flex: 1, minWidth: 200 }
];


export const getRowClassName = (
  params: GridRowParams<{
    [key: string]: boolean;
  }>
) => {
  if (params.row.attended) {
    return styles.attended;
  }

  if (!params.row.isActive) {
    return styles.cancelled;
  }

  return '';
};