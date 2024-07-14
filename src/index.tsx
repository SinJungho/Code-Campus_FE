import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root');

const root = createRoot(container!);

const queryClient = new QueryClient();

root.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </HelmetProvider>
);

reportWebVitals();