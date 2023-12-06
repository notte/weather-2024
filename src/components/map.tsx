import { useRef, useEffect, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import { allCity } from '../assets/data'
import * as type from '../types/interface.ts'
import data from '../assets/twCounty2010.geo.json'
import getWeatherIcon from '../utils/set-weather.ts'

// mapboxgl.accessToken =
//   'pk.eyJ1IjoieW95bzIwMjMiLCJhIjoiY2xvd2dnNWR0MDR5dDJxcGl3cjAwczUwbiJ9.HPB6vtrEbhCQILNbIDqktA'

// 資料來源以 props 傳入
const map = (_props: type.INowData[]) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [lng, setLng] = useState(120.9605)
  const [lat, setLat] = useState(23.6978)
  const [zoom, setZoom] = useState(6.6)

  useEffect(() => {
    const demo = { ..._props }
    for (let key in demo) {
      console.log(getWeatherIcon(demo[key].Weather as string))
    }
  }, [_props])
  // useEffect(() => {
  //   if (map.current) return

  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current as HTMLElement,
  //     style: 'mapbox://styles/yoyo2023/clp0uor9i00c601r6cyl8g78b',
  //     center: [lng, lat],
  //     zoom: zoom,
  //   })

  //   map.current.on('load', () => {
  //     map.current?.addSource('countries', {
  //       type: 'geojson',
  //       data: data as GeoJSON.FeatureCollection,
  //     })
  //     map.current?.addLayer(
  //       {
  //         id: 'country-fills',
  //         type: 'fill',
  //         source: 'countries',
  //         paint: {
  //           'fill-color': 'transparent',
  //         },
  //       },
  //       'country-label'
  //     )

  //     map.current?.addLayer({
  //       id: 'country-fills-hover',
  //       type: 'fill',
  //       source: 'countries',
  //       layout: {},
  //       paint: {
  //         'fill-color': '#0F2D33',
  //         'fill-opacity': 0.4,
  //       },
  //       filter: ['==', 'COUNTYNAME', ''],
  //     })

  //     map.current?.addLayer({
  //       id: 'country-borders',
  //       type: 'line',
  //       source: 'countries',
  //       layout: {},
  //       paint: {
  //         'line-color': '#111719',
  //         'line-width': 1,
  //       },
  //       filter: ['==', 'COUNTYNAME', ''],
  //     })

  //     for (const marker of allCity) {
  //       const customMarkerElement = document.createElement('div')
  //       customMarkerElement.className = 'clouds-icon'

  //       new mapboxgl.Marker({ element: customMarkerElement })
  //         .setLngLat([marker.coordinates[0], marker.coordinates[1]])
  //         .addTo(map.current as Map)
  //     }
  //   })

  //   map.current?.on('mousemove', (e) => {
  //     const features = map.current?.queryRenderedFeatures(e.point, {
  //       layers: ['country-fills'],
  //     })

  //     if (features!.length > 0) {
  //       map.current!.getCanvas().style.cursor = 'pointer'
  //       map.current?.setFilter('country-fills-hover', [
  //         '==',
  //         'COUNTYNAME',
  //         features![0].properties?.COUNTYNAME,
  //       ])
  //       map.current?.setFilter('country-borders', [
  //         '==',
  //         'COUNTYNAME',
  //         features![0].properties?.COUNTYNAME,
  //       ])
  //     } else {
  //       map.current?.setFilter('country-fills-hover', ['==', 'COUNTYNAME', ''])
  //       map.current?.setFilter('country-borders', ['==', 'COUNTYNAME', ''])
  //       map.current!.getCanvas().style.cursor = ''
  //     }
  //   })

  //   map.current.on('mouseout', () => {
  //     map.current!.getCanvas().style.cursor = 'auto'
  //     map.current?.setFilter('country-fills-hover', ['==', 'COUNTYNAME', ''])
  //   })
  // }, [])

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  )
}

export default map
