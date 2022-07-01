import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LayoutProvider from './components/Layout/context/layoutContext';
import './scss/style.scss';
import { getAccount } from './lib/user'
import { token } from "./util";
import { defaultSocket } from "./lib/sockets";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#ff6316',
      light: '#ff6e40',
      contrastText: '#ffffff',
      dark: '#ff6e40',
    },
    secondary: {
      main: '#ff6716',
      contrastText: '#ffffff',
    },
    text: {
      hint: 'rgba(255,255,255,0.5)',
      disabled: 'rgba(255,255,255,0.5)',
      secondary: 'rgba(255,255,255,0.7)',
      primary: 'rgba(255,255,255,0.5)',
    },
    warning: {
      main: '#ffff00',
    },
    error: {
      main: '#d21c11',
    },
  },
};
const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(document.getElementById('root'));
async function loadUser() {
  if (token.getLocalAccessToken()) {
    try {
      let r = await getAccount()
      if (r) {
        defaultSocket.subscribeUser(r.stream_token);
      }
    } catch (err) {
      console.error('loadUser', err)
    }
  }
};

root.render(
  loadUser() &&
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </BrowserRouter>
  </ThemeProvider>
);

