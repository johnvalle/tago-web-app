import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import AppRouter from './AppRouter';
import { Theme } from '@/constants';

function App() {
  return (
    <MantineProvider theme={Theme} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <AppRouter />
      </NotificationsProvider>
    </MantineProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
