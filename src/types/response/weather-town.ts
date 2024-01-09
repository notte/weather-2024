export interface IWeatherTownResponse {
  success: string
  result: Result
  records: Records
}

export interface Result {
  fields: Field[]
}

export interface Field {
  id: string
  type: string
}

export interface Records {
  locations: Location[]
}

export interface Location {
  datasetDescription: string
  locationsName: string
  dataid: string
  location: LocationTown[]
}

export interface LocationTown {
  locationName: string
  geocode: string
  lat: string
  lon: string
  weatherElement: WeatherElementTown[]
}

export interface WeatherElementTown {
  elementName: string
  description: string
  time: Time[]
}

export interface Time {
  endTime: string
  elementValue: ElementValue[]
  startTime?: string
  dataTime?: string
}

export interface ElementValue {
  value: string
  measures: string
}
