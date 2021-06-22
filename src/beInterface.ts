export type BeGeoJson = BeGeoJsonFeatureCollection

export type BeGeoJsonFeatureCollection = {
  type: 'FeatureCollection'
  features: BeGeoJsonFeature[]
}

export type BeGeoJsonFeature = {
  type: 'Feature'
  geometry?: BeGeoJsonGeometryPoint | BeGeoJsonGeometryPath
  properties: BeGeoJsonFeatureProps
}

export type BeGeoJsonGeometryPoint = {
  type: 'Point'
  coordinates: number[]
}
export type BeGeoJsonGeometryPath = {
  type: 'LineString'
  coordinates: number[][]
}

export type BeGeoJsonFeatureProps = {
  name: string
  addres?: string
  description?: string
  adress?: string
  timespan?: {
    begin: string
    end: string
  }
  Email: string
  Category: string
  Distance: string
  uuid: string
}

export type BeTrack = {
  name: string
  path: String
  categories: {
    paths?: string[]
    point?: string[]
  }
  tags: string[]
  description: string
  date?: {
    ms: number
    str: string
  }
  geoJsonId: string
  originalContentId: string
  _id: string
}

export type BeDateTrack = {
  ms: number
  str: string
}
