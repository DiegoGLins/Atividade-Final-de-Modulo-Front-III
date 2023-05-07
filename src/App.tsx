import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import React from 'react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store= {store}>
        <PersistGate persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
