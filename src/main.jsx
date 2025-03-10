import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/router'
import { Theme } from '@radix-ui/themes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <Router />
    </Theme>
  </StrictMode>,
)
