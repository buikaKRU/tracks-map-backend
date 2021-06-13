import { GeoJson } from '../GeoJson';
import mongoose, {Schema} from 'mongoose';

export class TrackCategories {
  public track: string[] = []
  public point: string[] = []
}

export type DateTrack = {
  ms: number,
  str: string
}

//https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
var GeoJsonSchema = new Schema({
  geoJson: {},
});

// Compile model from schema
const GeoJson = mongoose.model('GeoJson', GeoJsonSchema );

export default GeoJson