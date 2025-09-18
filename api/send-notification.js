// Endpoint serverless para enviar push via FCM (legacy HTTP API)
// Espera um POST com JSON: { title, body, token }
// Requer a variável de ambiente FCM_SERVER_KEY com a server key do Firebase

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { title, body, token } = req.body || {};

  if (!title || !body || !token) {
    res.status(400).json({ error: 'Missing title, body or token' });
    return;
  }

  const serverKey = process.env.FCM_SERVER_KEY;
  if (!serverKey) {
    res.status(500).json({ error: 'FCM_SERVER_KEY environment variable not set' });
    return;
  }

  try {
    const message = {
      to: token,
      notification: {
        title,
        body,
      },
    };

    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(500).json({ error: 'FCM error', details: data });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao enviar notificação FCM:', error);
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
};
