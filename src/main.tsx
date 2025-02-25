import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import { UserProvider } from './contexts/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <Provider store={store}>
        <Toaster/>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </React.StrictMode>
  </>
)
