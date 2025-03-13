import { supabase } from '@/supabase';

export const get_sku = async () => {
  try {
    const { data, error } = await supabase
      .from('skus')
      .select('*')

    if (error) {
      console.error('Error fetching skus:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in getSku:', error);
    return { error };
  }
}

export const delete_sku = async (skuId: string | number) => {
  try {
    const { error } = await supabase
      .from('skus')
      .delete()
      .eq('sku_id', skuId)

    if (error) {
      console.error('Error deleting sku:', error);
      return { error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteSku:', error);
    return { error };
  }
}

export const add_sku = async (skuData: any) => {
  try {
    const { data, error } = await supabase
      .from('skus')
      .insert(skuData)

    if (error) {
      console.error('Error adding sku:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in addSku:', error);
    return { error };
  }
}

export const update_sku = async (skuData: any) => {
  try {
    const { data, error } = await supabase
      .from('skus')
      .update(skuData)
      .eq('sku_id', skuData.sku_id)

    if (error) {
      console.error('Error updating sku:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in updateSku:', error);
    return { error };
  }
}