import { ColDef, RowDragEndEvent, SortChangedEvent } from 'ag-grid-community';

export interface AuthState {
  authenticated: boolean;
  user_info: any;
  login: (data: { authenticated: boolean, user_info: any }) => void;
  logout: () => void;
}


export interface DataTableProps {
  tableKey: string;
  columns: ColDef[];
  rowData: any[];
  onRowDataChange?: (updatedData: any[]) => void;
  onRowDragEnd?: (event: RowDragEndEvent) => void;
  showSerialNumber?: boolean;
  actionColumn?: {
    show: boolean;
    headerName?: string;
    width?: number;
    cellRenderer?: React.ComponentType<any>;
  };
}