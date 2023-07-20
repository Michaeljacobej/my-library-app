import '@/index.css';
import '@/global.css';
import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import App from '@/App';
import {persistor, store} from '@/store';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
