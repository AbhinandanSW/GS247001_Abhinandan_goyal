import { supabase } from '@/supabase';

export const get_store = async () => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')

    if (error) {
      console.error('Error fetching stores:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in getStore:', error);
    return { error };
  }
}

export const delete_store = async (storeId: string | number) => {
  try {
    const { error } = await supabase
      .from('stores')
      .delete()
      .eq('store_id', storeId)

    if (error) {
      console.error('Error deleting store:', error);
      return { error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteStore:', error);
    return { error };
  }
}

export const add_store = async (storeData: any) => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .insert(storeData)

    if (error) {
      console.error('Error adding store:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in addStore:', error);
    return { error };
  }
}

export const update_store = async (storeData: any) => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .update(storeData)
      .eq('store_id', storeData.store_id)

    if (error) {
      console.error('Error updating store:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in updateStore:', error);
    return { error };
  }
}