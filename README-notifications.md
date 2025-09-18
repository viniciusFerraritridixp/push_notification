# Notificações (FCM + Supabase)

Instruções rápidas para configurar o envio de notificações push via FCM e escutar eventos do Supabase.

## 1. Variáveis de ambiente
Defina na Vercel ou no seu ambiente local:
- `FCM_SERVER_KEY`: chave de servidor do Firebase Cloud Messaging (Settings > Cloud Messaging > Server key)
- `REACT_APP_SUPABASE_URL`: URL do seu projeto Supabase
- `REACT_APP_SUPABASE_ANON_KEY`: Chave anônima do Supabase

## 2. Estrutura da tabela `devices`
Certifique-se de ter uma tabela `devices` no Supabase com as colunas:
- `user_id` (texto/UUID) - identificador do usuário
- `token` (texto) - token FCM do dispositivo

## 3. Endpoints e funções
- `api/send-notification.js` - endpoint para um token: `{title, body, token}`
- `api/send-notification-multiple.js` - endpoint para múltiplos tokens: `{title, body, tokens: []}`
- `src/notifications/push.js` - funções cliente `sendPushNotification` e `sendPushNotificationToMultiple`
- `src/notifications/devices.js` - funções para gerenciar tokens: `getAllDeviceTokens` e `saveDeviceToken`

## 4. Como funciona
1. O app escuta mudanças na tabela `vendas` via Supabase Realtime
2. Quando detecta um INSERT:
   - Mostra toast local
   - Busca todos os tokens da tabela `devices`
   - Envia notificação push para todos os dispositivos registrados
3. Firebase gerencia a entrega das notificações

## 5. Para registrar um dispositivo
Use `saveDeviceToken(userId, token)` após obter o token FCM com `getFcmToken()`.

## 6. Teste local
```bash
cd push_notification
npm run start
```
Faça um INSERT na tabela `vendas` e verifique se as notificações são enviadas.
