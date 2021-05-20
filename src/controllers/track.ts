import express from 'express'
import Track from '../models/Track'


const router = express.Router()

// Get all posts
router.get("/", async (req, res) => {
  console.log('maybe??')
	const tracks = await Track.find()
	res.send(tracks)
  //res.send('tracks')
})

router.post("/add", async (req, res) => {
  
  const track = new Track({
    name: req.body.name || 'default'
  })
  track.save();
  await track.save;
  res.send(track);
})

const tracks = router;

export default tracks;