
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux"
import store from './redux/store.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from './utils/themes.ts'; 
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </Provider>)
