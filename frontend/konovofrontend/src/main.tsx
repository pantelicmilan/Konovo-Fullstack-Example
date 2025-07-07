import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './ToastProvider.tsx'
import { RequireOnline } from './RequireOnline.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <RequireOnline>
    <ToastProvider>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </QueryClientProvider>
      </StrictMode>
    </ToastProvider>
  </RequireOnline>
 
)
