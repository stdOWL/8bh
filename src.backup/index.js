import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LayoutProvider from './components/Layout/context/layoutContext';
import './scss/style.scss';
import { getAccount } from './lib/user'
import { token } from "./util";


const root = ReactDOM.createRoot(document.getElementById('root'));
async function loadUser() {
  if (token.getLocalAccessToken()) {
    try {
      await getAccount()
    } catch (err) {
      console.error('loadUser', err)
    }
  }
};

root.render(
  loadUser() &&
  <React.StrictMode>
    <BrowserRouter>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </BrowserRouter>
  </React.StrictMode>
);

