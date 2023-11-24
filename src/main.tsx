import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'mapbox-gl/dist/mapbox-gl.css'
import { BrowserRouter } from 'react-router-dom'
import './assets/index.css'
import './assets/style.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
