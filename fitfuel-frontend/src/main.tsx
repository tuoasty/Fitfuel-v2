import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    //Remove strict mode to fix double render
  <StrictMode>
    <App />
  </StrictMode>
    ,
)
