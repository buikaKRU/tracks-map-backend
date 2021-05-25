import { GeoJson } from './../GeoJson';
import mongoose, {Schema} from 'mongoose';

export type Track = {
  name: string,
  categories: string[],
  geoJson: GeoJson,
  originalContent: string
}

var TrackSchema = new Schema({
  name: String,
  categories: [String],
  geoJson: {},
  originalContent: mongoose.Types.ObjectId
  //a_date: Date
});

// Compile model from schema
const Track = mongoose.model('Track', TrackSchema );

export default Track