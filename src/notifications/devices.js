import { supabase } from '../config/supabase';

// Função para buscar todos os tokens de dispositivos na tabela devices
export const getAllDeviceTokens = async () => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('user_id, token')
      .not('token', 'is', null); // Apenas tokens não nulos

    if (error) {
      console.error('Erro ao buscar tokens:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Erro ao buscar dispositivos:', err);
    return [];
  }
};

// Função para salvar/atualizar token do dispositivo atual
export const saveDeviceToken = async (userId, token) => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .upsert(
        { user_id: userId, token: token },
        { onConflict: 'user_id' }
      );

    if (error) {
      console.error('Erro ao salvar token:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Erro ao salvar token do dispositivo:', err);
    return false;
  }
};