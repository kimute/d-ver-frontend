import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import { HelmetProvider } from 'react-helmet-async';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
);
reportWebVitals();
