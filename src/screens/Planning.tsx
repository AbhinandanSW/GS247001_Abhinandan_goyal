import { get_planning_data } from "@/api/planning";
import SSRMTable from "@/components/Table/SSRMTable";
import { planningColumn } from "@/constant/planningColumn";
import { useMemo, useState } from "react";

const Planning = () => {
const  [isLoading, setIsLoading] = useState(false);

const fetech_data = async (params:any,startRow:number,endRow:number, pageSize:number) => {
  try {
    const data = await get_planning_data(endRow/20, pageSize);
    setIsLoading(false);
    params.success({
      rowData: data,
      rowCount: 20,
      startRow,
      endRow,
    });
  } catch(e) {
    console.error(e, 'error while getting planning information');
  }
}
const data_source = useMemo(() => {
  return {
     getRows(params:any) {
      setIsLoading(true);
     if(params){
      try {
        let { startRow, endRow } = params.request;
        fetech_data(params,startRow,endRow, 20);
       
      } catch(e) {
        setIsLoading(false);
        console.error(e, 'error while getting planning information');
        params.fail();
      }
     }
    }
  };
}, []);  

  
  return (
    <div className="container mx-auto p-2">
    <div className='flex justify-between items-center mb-4'>
      <h1 className="text-2xl font-bold mb-4">Planning</h1>
    </div>
     
     {isLoading ? (
       <div className="flex justify-center items-center h-64">
         <p>Loading planning data...</p>
       </div>
     ) : (
       <SSRMTable
            columns={planningColumn}
            dataSource={data_source}      />
     )}
   </div>
  );
};
export default Planning;