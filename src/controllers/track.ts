import express from 'express'
import { lstat, writeFileSync } from 'fs'
//@ts-ignore
import multer from 'multer'
import Track from '../models/Track'

import formidable from 'formidable'


const router = express.Router()

// Get all posts
router.get("/", async (req, res) => {
  console.log('maybe??')
	const tracks = await Track.find()
	res.send(tracks)
  //res.send('tracks')
})

router.post("/addTest", async (req, res) => {
  
  const track = new Track({
    name: req.body.name || 'default'
    
  })
  track.save();
  await track.save;
  res.send(track);
})


//const upload = multer({dest: 'public/uploads/'}).single('file');

router.post("/addFile", async (req, res) => {

  const form = formidable({multiples: false, uploadDir: './public'})

  form.parse(req, (err, fields, files) => {
    if (err) {
      //@ts-ignore
      next(err);
      return;
    }
    res.json({ files });
  });



 
  // upload(req,res, (err: any) => {
    
  //   if (!err) {
  //     //@ts-ignore
  //     const file = req.file
  //     //console.log('file', file)
      
  //     // res.render('game', {
  //     //   name: req.body.name
  //     // })
      
  //     return res.send()

      
  //   }
  // })
  
  // const track = new Track({
  //   name: req.body.name || 'default'
  // })
  // track.save();
  // await track.save;

  
  // try {
  //   //console.log('------------- ', req);
  //   //@ts-ignore
  //   // console.log('------------- ', req.name );
    
  //   res.status(200)
  //   res.send(req)
    
  // } catch (e) {
  //   // res.status(500)
  //   // res.send(e)
    
  // }
})

const tracks = router;

export default tracks;