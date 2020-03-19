import React from 'react';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import light from '~/theme/light';

import { store, persistor } from './store';

import Routes from '~/routes';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={light}>
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
