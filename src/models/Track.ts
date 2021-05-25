import mongoose, {Schema} from 'mongoose'
import OriginalTrack from './OriginalTrack';


var TrackSchema = new Schema({
  name: String,
  //a_date: Date
  categories: [String],
  geoJson: {},
  // originalContent: mongoose.Types.ObjectId
  originalContent: String
});

// Compile model from schema
const Track = mongoose.model('Track', TrackSchema );

export default Track