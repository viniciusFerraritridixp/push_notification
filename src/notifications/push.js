export const sendPushNotification = async (title, body, token) => {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, token }),
    });

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    throw error;
  }
};

// Função para enviar notificação para múltiplos tokens
export const sendPushNotificationToMultiple = async (title, body, tokens) => {
  try {
    const response = await fetch('/api/send-notification-multiple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, tokens }),
    });

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar notificação para múltiplos dispositivos:', error);
    throw error;
  }
};
