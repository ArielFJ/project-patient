import { GridColDef, GridRowParams, GridValueGetterParams } from "@mui/x-data-grid";
import { formatDate } from "renderer/utils/dates";
import { trans } from "renderer/utils/localization";
import styles from '../styles.module.scss';
import dayjs from 'dayjs';

export const columns: GridColDef[] = [
  { field: 'id', headerName: trans('id'), width: 70, type: 'number', hide: true /*flex: .3,  minWidth: 30*/ },
  { field: 'attended', headerName: trans('attended'), type: 'boolean', hide: true },
  { field: 'isActive', headerName: trans('is active'), type: 'boolean', hide: true },
  {
    field: 'date',
    headerName: trans('date'),
    type: 'date',
    valueGetter: (params: GridValueGetterParams) => {
      if (dayjs(params.row.date as string).isAfter(dayjs())) {
        return `🟢 ${formatDate(params.row.date?.toString())}`;
      }
      return formatDate(params.row.date?.toString())
    },
    minWidth: 100,
    flex: 0.4
  },
  { field: 'reason', headerName: trans('reason'), flex: 1, minWidth: 200 },
  { field: 'treatment', headerName: trans('treatment'), flex: 1, minWidth: 200 },
  { field: 'diagnosis', headerName: trans('diagnosis'), flex: 1, minWidth: 200 }
];


export const getRowClassName = (
  params: GridRowParams<{
    [key: string]: boolean | string;
  }>
) => {
  if (params.row.attended) {
    return styles.attended;
  }

  if (!params.row.isActive) {
    return styles.cancelled;
  }

  console.log(params.row.date)
  if (dayjs(params.row.date as string).isAfter(dayjs())) {
    return styles.future;
  }

  return '';
};