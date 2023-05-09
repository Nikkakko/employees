import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { GlobalStyles } from './styles/globalStyles.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>
);
