import express from 'express'
import Track from '../models/Track'


const router = express.Router()

// Get all posts
router.get("/", async (req, res) => {
  console.log('maybe??')
	//const tracks = await Track.find()
	// res.send(tracks)
  res.send('tracks')
})

router.post("/add", async (req, res) => {
  console.log('add');
  res.send(req.body);
  res.status(200);
})

const tracks = router;

export default tracks;