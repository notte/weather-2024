import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTownWeather } from '../redux/thunks'
import EventBus from '../utils/event-bus'

const weatherTownRequest = () => {
  const dispatch = useDispatch()
  const weatherTown = useSelector((state: { town: unknown }) => state.town)

  // useEffect(() => {
  //   dispatch(
  //     fetchTownWeather({ cityid: 'F-D0047-001', town: '羅東鎮' }) as never
  //   )

  //   const intervalWeather = setInterval(
  //     () => {
  //       fetchTownWeather({ cityid: 'F-D0047-001', town: '羅東鎮' })
  //     },
  //     15 * 60 * 1000
  //   )

  //   EventBus.emit('loading-change', false)
  //   return () => {
  //     clearInterval(intervalWeather)
  //   }
  // }, [])

  useEffect(() => {
    // console.log(weatherTown)
  }, [weatherTown])

  return <></>
}

export default weatherTownRequest
