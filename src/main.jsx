import React from 'react'
import ReactDOM from 'react-dom/client'
//redux
import { Provider } from 'react-redux'
import store from './app/store';
//redux persistor
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

const persistor = persistStore

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
