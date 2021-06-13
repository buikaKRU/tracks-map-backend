import mongoose, {Schema} from 'mongoose'


const TrackSchema = new Schema({
  name: String,
  path: String,
  categories: {
    track: [String],
    point: [String]
  },
  tags: [String],
  description: String,
  date: {
    ms: Number,
    str: String
  },
  geoJsonId: mongoose.Types.ObjectId ,
  originalContentId: mongoose.Types.ObjectId,
});

type BeTrack = {
  name: string,
  path: String,
  categories: {
    track?: string[],
    point?: string[]
  },
  tags: string[],
  description: string,
  date?: {
    ms: number,
    str: string
  }
  geoJsonId: string,
  originalContentId: string,
  _id: string
}

// Compile model from schema
const Track = mongoose.model('Track', TrackSchema );

export default Track