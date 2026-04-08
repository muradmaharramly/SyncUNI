import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { DataProvider } from './context/DataContext'
import './styles/main.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />
      <Toaster position="top-right" toastOptions={{ style: { background: '#1E293B', color: '#fff', borderRadius: '12px' } }} />
    </DataProvider>
  </StrictMode>,
)
