import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { generateToken, messaging } from './notifications/firebase';
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body);
    });
  }, []);

  return (
    <div className="App">
      <Toaster position='top-right' />
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
