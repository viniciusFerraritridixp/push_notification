import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { generateToken, messaging, getFcmToken } from './notifications/firebase';
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from './config/supabase';
import { sendPushNotificationToMultiple } from './notifications/push';
import { getAllDeviceTokens } from './notifications/devices';

function App() {

  useEffect(() => {
    generateToken();
    
    // Escutar notificações do Firebase
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body);
    });

    // Escutar mudanças no Supabase (substitua 'sua_tabela' pelo nome da sua tabela)
    const subscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vendas' },
        async (payload) => {
          console.log('Mudança detectada:', payload);
          
          // Enviar notificação local quando houver mudança
          try {
            if (payload.eventType === 'INSERT') {
              toast.success('Novo registro adicionado!');
              
              // Buscar todos os tokens de dispositivos registrados
              const devices = await getAllDeviceTokens();
              const tokens = devices.map(device => device.token).filter(token => token);
              
              if (tokens.length > 0) {
                // Montar título e corpo com dados do registro
                const record = payload.new || payload.record || {};
                const title = 'Novo registro';
                const body = record?.descricao || `Um novo registro foi adicionado na tabela vendas.`;
                
                // Enviar notificação para todos os dispositivos
                await sendPushNotificationToMultiple(title, body, tokens);
                console.log(`Notificação enviada para ${tokens.length} dispositivos`);
              } else {
                console.log('Nenhum token de dispositivo encontrado na tabela devices');
              }
            } else if (payload.eventType === 'UPDATE') {
              toast.info('Registro atualizado!');
            } else if (payload.eventType === 'DELETE') {
              toast.error('Registro removido!');
            }
          } catch (err) {
            console.error('Erro no handler de realtime:', err);
          }
        }
      )
      .subscribe();

    // Cleanup da subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Toaster position='top-right' />
      <header className="App-header">
        <h1>Notificações Automáticas</h1>
      </header>
    </div>
  );
}

export default App;
