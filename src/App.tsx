import { useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'

// mapboxgl.accessToken =
//   'pk.eyJ1IjoieW95bzIwMjMiLCJhIjoiY2xvd2dnNWR0MDR5dDJxcGl3cjAwczUwbiJ9.HPB6vtrEbhCQILNbIDqktA'

const App = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // 僅初始化地圖一次

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/yoyo2023/clp0uor9i00c601r6cyl8g78b',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  )
}

export default App
