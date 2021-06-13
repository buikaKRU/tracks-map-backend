import express from 'express';
import Track from '../models/Track';

const router = express.Router();

/** deprecated (moved to track) */
// router.get("/all", async (req, res) => {
//   console.log('maybe??')
// 	const library = await Track.find();
// 	res.json({lenght: library.length, library})
//   //res.send('tracks')
// })


const library = router;

export default library;
