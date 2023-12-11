export interface IAirNowResponse {
  fields: Field[]
  resource_id: string
  __extras: Extras
  include_total: boolean
  total: string
  resource_format: string
  limit: string
  offset: string
  _links: Links
  records: Record[]
}

export interface Field {
  id: string
  type: string
  info: Info
}

export interface Info {
  label: string
}

export interface Extras {
  api_key: string
}

export interface Links {
  start: string
  next: string
}

export interface Record {
  sitename: string
  county: string
  aqi: string
  pollutant: string
  status: string
  so2: string
  co: string
  o3: string
  o3_8hr: string
  pm10: string
  'pm2.5': string
  no2: string
  nox: string
  no: string
  wind_speed: string
  wind_direc: string
  publishtime: string
  co_8hr: string
  'pm2.5_avg': string
  pm10_avg: string
  so2_avg: string
  longitude: string
  latitude: string
  siteid: string
}
