import mongoose, {Schema} from 'mongoose'


var TrackSchema = new Schema({
  name: String,
  //a_date: Date
  originalContent: String,
  categories: [String]
});

// Compile model from schema
const Track = mongoose.model('Track', TrackSchema );

export default Track