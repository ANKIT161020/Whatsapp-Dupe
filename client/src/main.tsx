import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Your Tailwind CSS imports are here

// Redux Toolkit Provider
import { Provider } from 'react-redux';
import { store } from './store';

// TanStack Query Provider
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './services/queryClient'; // Your query client instance

// React Query Devtools (optional, but very useful for debugging)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* Optional: React Query Devtools for debugging */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
