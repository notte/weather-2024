export interface IWeatherWeekResponse {
  success: string
  result: Result
  records: Records
}

export interface Result {
  resource_id: string
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
  location: CityWeek[]
}

export interface CityWeek {
  locationName: string
  geocode: string
  lat: string
  lon: string
  weatherElement: WeatherElement[]
}

export interface WeatherElement {
  elementName: string
  description: string
  time: Time[]
}

export interface Time {
  startTime: string
  endTime: string
  elementValue: ElementValue[]
}

export interface ElementValue {
  value: string
  measures: string
}
