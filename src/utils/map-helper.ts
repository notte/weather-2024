const handleMousemove = (e: MapMouseEvent) => {
  const features = map.current?.queryRenderedFeatures(e.point, {
    layers: ['country-fills'],
  })

  if (features!.length > 0) {
    map.current!.getCanvas().style.cursor = 'pointer'
    map.current?.setFilter('country-fills-hover', [
      '==',
      'COUNTYNAME',
      features![0].properties?.COUNTYNAME,
    ])
    map.current?.setFilter('country-borders', [
      '==',
      'COUNTYNAME',
      features![0].properties?.COUNTYNAME,
    ])
  }
}

const handleMouseOut = () => {
  map.current?.setFilter('country-fills-hover', ['==', 'COUNTYNAME', ''])
  map.current?.setFilter('country-borders', ['==', 'COUNTYNAME', ''])
}

const handleClick = (e: MapMouseEvent) => {
  const features = map.current?.queryRenderedFeatures(e.point, {
    layers: ['country-fills'],
  })
  if (features!.length > 0) {
    try {
      const clickedFeature = features![0].properties
      let selectCity = clickedFeature!.COUNTYNAME
      selectCity = getCityName(selectCity)
      map.current?.flyTo({ center: [lng, lat], zoom: zoom })
      EventBus.emit('city-status', selectCity)
    } finally {
      map.current?.scrollZoom.disable()
      map.current?.dragPan.disable()
      map.current?.dragRotate.disable()
      map.current?.keyboard.disable()
      map.current?.touchZoomRotate.disable()
    }
  }
}
