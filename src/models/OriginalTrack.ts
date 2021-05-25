import mongoose, {Schema} from 'mongoose'


var OriginalTrackSchema = new Schema({
  originalName: String,
  originalContent: String,
  format: String
});

// Compile model from schema
const OriginalTrack = mongoose.model('OriginalTrack', OriginalTrackSchema );

export default OriginalTrack