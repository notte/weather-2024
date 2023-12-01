import { useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import { allCity } from '../assets/data'
import * as type from '../types/interface.ts'

mapboxgl.accessToken =
  'pk.eyJ1IjoieW95bzIwMjMiLCJhIjoiY2xvd2dnNWR0MDR5dDJxcGl3cjAwczUwbiJ9.HPB6vtrEbhCQILNbIDqktA'

// 資料來源以 props 傳入
const map = (_props: type.INowData[]) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [lng, setLng] = useState(120.9605)
  const [lat, setLat] = useState(23.6978)
  const [zoom, setZoom] = useState(5)
  // const [taiwanCounties, setTaiwanCounties] = useState<
  //   type.IAllCity[] | type.INowData[]
  // >(allCity.concat())

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/yoyo2023/clp0uor9i00c601r6cyl8g78b',
      center: [lng, lat],
      zoom: zoom,
    })

    map.current?.on('style.load', () => {
      map.current?.addSource('line', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      })

      const geojsonSource = map.current?.getSource(
        'line'
      ) as mapboxgl.GeoJSONSource

      const lineFeatures = []

      for (const marker of allCity) {
        const endLongitude =
          marker.coordinates[0] +
          (Math.cos((marker.angle * Math.PI) / 180) * marker.distance) /
            (111.32 * Math.cos(marker.coordinates[1] * (Math.PI / 180)))
        const endLatitude =
          marker.coordinates[1] +
          (Math.sin((marker.angle * Math.PI) / 180) * marker.distance) / 111.32

        lineFeatures.push({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [marker.coordinates, [endLongitude, endLatitude]],
          },
        })
      }

      geojsonSource.setData({
        type: 'FeatureCollection',
        features: lineFeatures as mapboxgl.MapboxGeoJSONFeature[],
      })

      map.current?.addLayer({
        id: 'line',
        type: 'line',
        source: 'line',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          'line-miter-limit': 2,
        },
        paint: {
          'line-color': '#57D5F0',
          'line-width': 3,
        },
      })
    })
  }, [])

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  )
}

export default map
