import express from 'express'
//@ts-ignore
import multer from 'multer'
import Track from '../models/Track'


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


const upload = multer({dest: 'public/uploads/'}).single('file');

router.post("/addFile", async (req, res) => {

  console.log('post')
  //console.log('-------------', req.name);

  
  
  upload(req,res, (err: any) => {
    
    //@ts-ignore
    const file = req.file
    if (!err) {
      
      
      console.log(file)
      
      return res.send('okay')
      
    }
  })
  
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