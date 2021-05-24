
export type GeoJson = GJsonFeatureCollection;

export type GJsonFeatureCollection = {
  type: 'FeatureCollection'
  features: GJsonFeature[]
}

export type GJsonFeature = {
  type: 'Feature',
  geometry: GJsonGeometryPoint | GJsonGeometryLine,
  properties: GJsonFeatureProps
}


export type GJsonGeometryPoint = {
  type: 'Point',
  coordinates: number[]
}
export type GJsonGeometryLine = {
  type: 'LineString',
  coordinates: (number[])[]
}

export type GJsonFeatureProps = {
  name: string,
  addres?: string,
  description?: string,
  adress?: string,
  timespan?: {
    begin: string,
    end: string
  },
  Email: string,
  Category: string,
  Distance: string
}
