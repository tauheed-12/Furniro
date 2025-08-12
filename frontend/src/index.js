import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import { Provider } from 'react-redux';
import store from './store';
import Notification from './components/NotificationSysterm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Notification />
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

