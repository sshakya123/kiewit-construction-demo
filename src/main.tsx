import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './reusuable/ErrorBoundary';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ErrorBoundary>
        <Toaster />
        <App />
      </ErrorBoundary>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
