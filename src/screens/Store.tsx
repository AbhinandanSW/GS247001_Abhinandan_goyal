import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/supabase';
import DataTable from '@/components/Table/DataTable';
import { TrashIcon, PlusIcon } from 'lucide-react';
import { storeColumn } from '@/constant/storeColumn';

const Store = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Action cell renderer component
  const ActionCellRenderer = (props: any) => (
      <div className="flex items-center gap-1 cursor-pointer p-2"   onClick={() => deleteStore(props.data.store_id)}>
      <TrashIcon size={16} className=""/>
      </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('stores').select('*');
      
      if (error) {
        console.error('Error fetching data:', error);
        return;
      }
      
      // Handle saved row order from session storage
      const savedOrderString = sessionStorage.getItem('stores-rowOrder');
      if (savedOrderString) {
        const savedOrder = JSON.parse(savedOrderString);
        
        // Sort data based on saved order
        const orderedData = data.map(item => {
          const storedItem = savedOrder.find((order: any) => order.store_id === item.store_id);
          return storedItem ? { ...item, row_order: storedItem.row_order } : item;
        });
        
        // Sort by row_order
        orderedData.sort((a, b) => (a.row_order || 0) - (b.row_order || 0));
        setRowData(orderedData);
      } else {
        setRowData(data);
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStore = async (storeId: string | number) => {
    try {
      const { error } = await supabase.from('stores').delete().eq('store_id', storeId);
      
      if (error) {
        console.error('Error deleting data:', error);
        return;
      }
      
      // Update local state
      setRowData(rowData.filter(row => row.store_id !== storeId));
      
      // Update session storage after deletion
      const updatedData = rowData.filter(row => row.store_id !== storeId);
      const rowOrder = updatedData.map((row, index) => ({ store_id: row.store_id, row_order: index + 1 }));
      sessionStorage.setItem('stores-rowOrder', JSON.stringify(rowOrder));
    } catch (error) {
      console.error('Error in deleteStore:', error);
    }
  };

  const addStore = async () => {
    try {
      const newStore = {
        store_id: `S${Math.floor(100 + Math.random() * 900)}`, // Generate a random store ID
        label: 'New Store',
        city: 'New City',
        state: 'NC',
        row_order: rowData.length + 1,
      };

      const { data, error } = await supabase.from('stores').insert([newStore]).select();
      
      if (error) {
        console.error('Error adding store:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setRowData([...rowData, ...data]);
      }
    } catch (error) {
      console.error('Error in addStore:', error);
    }
  };

  const onRowDataChange = (updatedData: any[]) => {
    // This gets called when the row data changes due to sorting or dragging
    setRowData(updatedData);
    
    // Update session storage with new order
    const rowOrder = updatedData.map((row, index) => ({ 
      store_id: row.store_id, 
      row_order: index + 1 
    }));
    sessionStorage.setItem('stores-rowOrder', JSON.stringify(rowOrder));
  };

  const onRowDragEnd = async (event: any) => {
    try {
      // Get all rows in their current order after drag
      const updatedRows: any[] = [];
      event.api.forEachNode((node: any) => {
        if (node.data) {
          updatedRows.push({ ...node.data, row_order: updatedRows.length + 1 });
        }
      });
      
      // Update row order in database
      await updateRowOrder(updatedRows);
    } catch (error) {
      console.error('Error in onRowDragEnd:', error);
    }
  };

  const updateRowOrder = async (updatedData: any[]) => {
    try {
      // Prepare data for update - only updating row_order
      // const updates = updatedData.map(row => ({
      //   store_id: row.store_id,
      //   row_order: row.row_order
      // }));
      
      // // Update in database
      // const { error } = await supabase
      //   .from('stores')
      //   .upsert(updates, { onConflict: ['store_id'] });

      // if (error) {
      //   console.error('Error updating row order:', error);
      //   return;
      // }
      
      // Update local state
      setRowData(updatedData);
    } catch (error) {
      console.error('Error in updateRowOrder:', error);
    }
  };

  return (
    <div className="container mx-auto p-2">
     <div className='flex justify-between items-center mb-4'>
     <h1 className="text-2xl font-bold mb-4">Store Management</h1>
      <Button
        variant="default"
        onClick={addStore}
        className="flex items-center gap-1"
      >
        <PlusIcon size={16} />
        Add New Store
      </Button>
     </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading stores...</p>
        </div>
      ) : (
        <DataTable
          tableKey="stores" // Changed from 'key' to 'tableKey' based on our enhanced component
          columns={storeColumn}
          rowData={rowData}
          onRowDataChange={onRowDataChange}
          onRowDragEnd={onRowDragEnd}
          showSerialNumber={true}
          actionColumn={{
            show: true,
            headerName: 'Actions',
            width: 120,
            cellRenderer: ActionCellRenderer
          }}
        />
      )}
    </div>
  );
};

export default Store;