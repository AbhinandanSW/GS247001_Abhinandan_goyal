import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {  ModuleRegistry} from 'ag-grid-community';
import { SSRMDataTableProps } from '@/types/index';

import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";

ModuleRegistry.registerModules([
  AllEnterpriseModule
]);
const VITE_APP_AG_GRID_LICENSE_KEY = import.meta.env.VITE_APP_AG_GRID_LICENSE_KEY;
LicenseManager.setLicenseKey(VITE_APP_AG_GRID_LICENSE_KEY);

const SSRMTable = ({
  columns,
  dataSource
}: SSRMDataTableProps) => {

  return (
    <div className="p-2">
      <div className="ag-theme-alpine" style={{ width: '100%', height: '100%', maxHeight:'75vh', overflowY: 'auto' }}>
        <AgGridReact
          columnDefs={columns}
          pagination={true}
          paginationPageSize={20}
          cacheBlockSize={20}
          serverSideDatasource={dataSource}
          rowModelType={"serverSide"}
        />
      </div>
    </div>
  );
};

export default SSRMTable;