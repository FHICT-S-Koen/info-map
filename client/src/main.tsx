import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import StoreProvider from './Store'

const providerConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_KEY || '',
  redirectUri: window.location.origin,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || '',
  scope: 'read:current_user update:current_user_metadata',
}

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Auth0Provider {...providerConfig}>
        <App />
      </Auth0Provider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
