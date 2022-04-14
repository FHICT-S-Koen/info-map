import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import StoreProvider from './Store'
import NavBar from './components/NavBar'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <NavBar />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
