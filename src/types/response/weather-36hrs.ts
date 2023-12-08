export interface IWeather36hrsResponse {
  success: string
  result: Result
  records: Records36hr
}

export interface Result {
  resource_id: string
  fields: Field[]
}

export interface Field {
  id: string
  type: string
}

export interface Records36hr {
  datasetDescription: string
  location: Location[]
}

export interface Location {
  locationName: string
  weatherElement: WeatherElement[]
}

export interface WeatherElement {
  elementName: string
  time: Time[]
}

export interface Time {
  startTime: string
  endTime: string
  parameter: Parameter
}

export interface Parameter {
  parameterName: string
  parameterValue?: string
  parameterUnit?: string
}
