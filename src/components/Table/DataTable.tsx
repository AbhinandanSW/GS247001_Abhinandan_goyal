import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, RowDragEndEvent, SortChangedEvent, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { DataTableProps } from '@/types/index';
import { GripVerticalIcon } from 'lucide-react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataTable = ({
  tableKey,
  columns,
  rowData,
  onRowDataChange,
  onRowDragEnd,
  showSerialNumber = true,
  actionColumn
}: DataTableProps) => {
  const [localRowData, setLocalRowData] = useState(rowData);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  // Update local row data when prop changes
  useEffect(() => {
    setLocalRowData(rowData);
  }, [rowData]);

  // Custom cell renderer for serial number with drag icon
  const SerialNumberCellRenderer = (params: any) => {
    return (
      <div className="flex items-center">
        <span className="mr-2 cursor-move text-gray-500">
        <GripVerticalIcon size={16} />
        </span>
        <span>{params.value}</span>
      </div>
    );
  };

  // Build column definitions based on props
  useEffect(() => {
    const newColumnDefs: ColDef[] = [];
    
    // Add serial number column if enabled
    if (showSerialNumber) {
      newColumnDefs.push({
        headerName: '#',
        field: 'serialNumber',
        width: 100,
        sortable: false,
        filter: false,
        resizable: false,
        rowDrag: true,
        cellRenderer: SerialNumberCellRenderer
      });
    }
    
    // Add provided columns
    newColumnDefs.push(...columns);
    
    // Add action column if configured
    if (actionColumn?.show) {
      newColumnDefs.push({
        headerName: actionColumn.headerName || 'Actions',
        field: 'actions',
        width: actionColumn.width || 120,
        sortable: false,
        filter: false,
        resizable: true,
        pinned: 'right',
        cellRenderer: actionColumn.cellRenderer
      });
    }
    
    setColumnDefs(newColumnDefs);
  }, [columns, showSerialNumber, actionColumn]);

  // Update row order and save to session storage
  const updateRowOrder = (updatedData: any[]) => {
    if (!onRowDataChange) return;
    
    const rowOrder = updatedData.map((row, index) => ({ 
      id: row.id, 
      row_order: index + 1 
    }));
    
    // Save to sessionStorage with the tableKey
    sessionStorage.setItem(`${tableKey}-rowOrder`, JSON.stringify(rowOrder));
    
    // Call the callback with updated data
    onRowDataChange(updatedData);
  };

  // Add serial numbers to the data
  const addSerialNumbers = (data: any[]) => {
    return data.map((row, index) => ({ 
      ...row, 
      serialNumber: index + 1 
    }));
  };

  // Handle row drag end event
  const handleRowDragEnd = (event: RowDragEndEvent) => {
    const draggedNode = event.node;
    const targetIndex = event.overIndex;
    
    // Get the current row data
    const currentData = [...localRowData];
    
    // Find the dragged item
    const draggedItem = currentData.find(item => item.id === draggedNode.data.id);
    if (!draggedItem) return;
    
    // Remove from the current position
    const sourceIndex = currentData.indexOf(draggedItem);
    currentData.splice(sourceIndex, 1);
    
    // Insert at the new position
    currentData.splice(targetIndex, 0, draggedItem);
    
    // Update the row order
    updateRowOrder(currentData);
    
    // Call the onRowDragEnd callback if provided
    if (onRowDragEnd) {
      onRowDragEnd(event);
    }
  };

  return (
    <div className="p-2">
      <div className="ag-theme-alpine" style={{ width: '100%', height: '100%', maxHeight:'75vh', overflowY: 'auto' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={addSerialNumbers(localRowData)}
          domLayout="autoHeight"
          rowDragManaged={true}
          animateRows={true}
          suppressMoveWhenRowDragging={false}
          suppressDragLeaveHidesColumns={true}
          onSortChanged={(event: SortChangedEvent | any) => {
            if (!event.api.getModel()) return;
            
            // Get all rows in their current order
            const updatedData: any[] = [];
            event.api.forEachNode((node: any) => {
              if (node.data) {
                updatedData.push(node.data);
              }
            });
            
            // Update row order
            updateRowOrder(updatedData);
          }}
          onRowDragEnd={handleRowDragEnd}
        />
      </div>
    </div>
  );
};

export default DataTable;