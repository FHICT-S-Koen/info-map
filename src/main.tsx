import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import StoreProvider from './components/Store'
import NavBar from './components/NavBar'
import Canvas from './components/Canvas'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <NavBar />
      <Canvas />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
