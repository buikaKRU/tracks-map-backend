import express from 'express';
import LibraryIndex from '../models/LibraryIndex';

const router = express.Router();

router.get("/all", async (req, res) => {
  console.log('maybe??')
	const library = await LibraryIndex.find();
	res.json({lenght: library.length, library})
  //res.send('tracks')
})


const library = router;

export default library;
