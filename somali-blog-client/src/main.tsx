import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux"
import App from '@/App'
import store from './redux/store'
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from './components/theme-provider'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider store={store} >
              <App />
              <Toaster />
              </Provider>
          </ThemeProvider>
    
  </StrictMode>,
)
