import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/router'
import { Theme } from '@radix-ui/themes'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <Toaster position='top-right' richColors />
      <Router />
    </Theme>
  </StrictMode>,
)
