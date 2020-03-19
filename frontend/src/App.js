import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/Reactotron';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from '~/styles';

import { store, persistor } from './store';

import light from '~/styles/theme/light';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={light}>
          <Router history={history}>
            <Routes />
            <ToastContainer />
            <GlobalStyle />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
