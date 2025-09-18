// Endpoint serverless para enviar push via FCM para múltiplos tokens
// Espera um POST com JSON: { title, body, tokens: ["token1", "token2", ...] }
// Requer a variável de ambiente FCM_SERVER_KEY com a server key do Firebase

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { title, body, tokens } = req.body || {};

  if (!title || !body || !tokens || !Array.isArray(tokens) || tokens.length === 0) {
    res.status(400).json({ error: 'Missing title, body or tokens array' });
    return;
  }

  const serverKey = process.env.FCM_SERVER_KEY;
  if (!serverKey) {
    res.status(500).json({ error: 'FCM_SERVER_KEY environment variable not set' });
    return;
  }

  try {
    // Enviar notificação para cada token
    const promises = tokens.map(async (token) => {
      const message = {
        to: token,
        notification: {
          title,
          body,
        },
      };

      try {
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${serverKey}`,
          },
          body: JSON.stringify(message),
        });

        const data = await response.json();
        return {
          token,
          success: response.ok,
          data: data,
        };
      } catch (error) {
        return {
          token,
          success: false,
          error: String(error),
        };
      }
    });

    const results = await Promise.all(promises);
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    res.status(200).json({
      message: `Notificações enviadas: ${successful} sucesso, ${failed} falharam`,
      total: tokens.length,
      successful,
      failed,
      results,
    });
  } catch (error) {
    console.error('Erro ao enviar notificações FCM:', error);
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
};