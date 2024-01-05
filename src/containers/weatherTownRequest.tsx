import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTownWeather } from '../redux/thunks'
import EventBus from '../utils/event-bus'

const weatherTownRequest = () => {
  const [cityId, setCityId] = useState<string | null>(null)
  const [town, setTown] = useState<string | null>(null)
  const dispatch = useDispatch()
  const weatherTown = useSelector((state: { town: unknown }) => state.town)

  const getData = async () => {
    if (cityId && town) {
      dispatch(fetchTownWeather({ cityid: cityId, town: town }) as never)
    }
  }

  useEffect(() => {
    if (cityId && town) {
      getData()
    }
    const intervalWeather = setInterval(
      () => {
        getData()
      },
      15 * 60 * 1000
    )

    EventBus.emit('loading-change', false)

    return () => {
      clearInterval(intervalWeather)
    }
  }, [cityId, town])

  const handleGetTown = useCallback(
    (data: { id: string; town: string }) => {
      setCityId(() => data.id)
      setTown(() => data.town)
      EventBus.emit('36hours-status', false)
      EventBus.emit('forecast-status', false)
    },
    [setCityId, setTown]
  )

  useEffect(() => {
    const subscriptionTownClick = EventBus.on('getTown-status', handleGetTown)
    // const subscriptionTownStatus = EventBus.on('town-status', handleBack)

    return () => {
      subscriptionTownClick.off('getTown-status')
      // subscriptionTownStatus.off('town-status')
    }
  }, [])

  useEffect(() => {}, [weatherTown])

  return <></>
}

export default weatherTownRequest
