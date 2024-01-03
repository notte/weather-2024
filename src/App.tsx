import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Weather from './pages/weather'
import Layout from './components/layout'
import Loading from './components/loading'
import EventBus from './utils/event-bus'

const App = () => {
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const subscriptionCity = EventBus.on('loading-change', (data) => {
      if (data === false) {
        const id = setInterval(() => {
          setLoading(() => data)
        }, 2000)
        return () => {
          clearInterval(id)
        }
      }
      setLoading(() => data)
    })

    return () => {
      subscriptionCity.off('loading-change')
    }
  }, [loading])

  return (
    <>
      {loading && <Loading />}
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
