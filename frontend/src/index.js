import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import Notification from './components/NotificationSysterm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Notification />
      <App />
    </Provider>
  </React.StrictMode>
);

