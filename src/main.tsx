import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import StoreProvider from './components/Store'
import NavBar from './components/NavBar'
import Canvas from './components/canvas/Canvas'
import CoordsButton from './components/CoordsButton'
import ZoomButton from './components/ZoomButton'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <NavBar />
      <Canvas />
      <CoordsButton />
      <ZoomButton />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
