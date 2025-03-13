import { supabase } from '@/supabase';
import _, { map } from 'lodash';
import { get_sku } from './sku';
import { get_store } from './store';

const get_planning = async (page:number, pageSize:number) => {
  try {
    const offset = (page - 1) * pageSize;
    const { data, error } = await supabase
      .rpc('get_planning_data', { limit_rows: pageSize, offset_rows: offset });

    if (error) {
      console.error('Error fetching planning:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in getPlanning:', error);
    return { error };
  }
}

const get_calendar = async () => {
  try {
    const { data, error } = await supabase
      .from('calendar')
      .select('*')

    if (error) {
      console.error('Error fetching calendar:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in getCalendar:', error);
    return { error };
  }
}
export const get_planning_data = async(page = 1, pageSize = 100)=>{
  const planning_data:any = await get_planning(page, pageSize);
  const sku_data :any= await get_sku();
  const store_data:any = await get_store();
  const calender_data:any = await get_calendar();

const new_data = map(planning_data.data, (planning)=>{
  const sku = _.find(sku_data.data, {sku_id: planning.sku_id});
  const store = _.find(store_data.data, {store_id: planning.store_id});

  let new_sales = map(planning.sales, (sale)=>{
    const calender = _.find(calender_data.data, {week_id: sale.week_id});
    return {
      ...sale,
      ...calender
    }
  })

  return {
    ...planning,
    sku_name: sku?.label,
    store_name: store?.label,
    class: sku?.class,
    department: sku?.department,
    sales:new_sales

  }
})
  return new_data
}