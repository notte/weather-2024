import { Routes, Route, Navigate } from 'react-router-dom'
import Weather from './pages/weather'
import Layout from './components/layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="weather" />} />
        <Route path="/" element={<Layout />}>
          <Route path="weather" element={<Weather />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
