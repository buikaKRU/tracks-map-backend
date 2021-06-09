import mongoose, {Schema} from 'mongoose'


const LibraryIndexSchema = new Schema({
  name: String,
  trackId: mongoose.Types.ObjectId ,
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
  trackId: string,
  path: String,
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