import mongoose, {Schema} from 'mongoose'


const LibraryIndexSchema = new Schema({
  name: String,
  geoJsonId: mongoose.Types.ObjectId ,
  originalContentId: mongoose.Types.ObjectId,
  path: String,
  categories: {
    track: [String],
    point: [String]
  },
  date: {
    ms: Number,
    str: String
  }
});

type LibraryIndex = {
  name: string,
  path: String,
  GeoJsonId: string,
  originalContentId: string,
  categories: {
    track?: string[],
    point?: string[]
  },
  date?: {
    ms: number,
    str: string
  }

}

// Compile model from schema
const LibraryIndex = mongoose.model('LibraryIndex', LibraryIndexSchema );

export default LibraryIndex