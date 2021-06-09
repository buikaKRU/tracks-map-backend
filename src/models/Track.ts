import { GeoJson } from './../GeoJson';
import mongoose, {Schema} from 'mongoose';

export type Track = {
  name: string,
  categories: TrackCategories
  geoJson: GeoJson,
  libraryIndexId: string
  path: string,
  date: DateTrack
  originalContent: string
}

export class TrackCategories {
  public track: string[] = []
  public point: string[] = []
}

export type DateTrack = {
  ms: number,
  str: string
}

//https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
var TrackSchema = new Schema({
  name: String,
  categories: {
    track: [String],
    point: [String]
  },
  geoJson: {},
  libraryIndexId: mongoose.Types.ObjectId,
  path: String,
  originalContent: mongoose.Types.ObjectId,
  date: {
    ms: Number,
    str: String
  }
});

// Compile model from schema
const Track = mongoose.model('Track', TrackSchema );

export default Track