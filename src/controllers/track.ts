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



router.post("/addFile", async (req, res) => {
  
  // const form = formidable({multiples: false, uploadDir: './public'})
  
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
    //     //@ts-ignore
  //     next(err);
  //     return;
  //   }
  //   res.json({ files });
  // });
  
  var storage = multer.memoryStorage()
  const upload = multer({dest: 'public/uploads/', storage: storage }).single('file');
  
  
  upload(req,res, async (err: any) => {
    
    if (!err) {
      //@ts-ignore
      const file = req.file
      console.log('file', file)
        //console.log(file)
        const str = file.buffer.toString('utf-8')
      
        const track = new Track({
          name: file.originalname || 'defaultName',
          originalContent: str
        })
        track.save();


        await track.save;




        return res.json({ track });

      
    }
  })
  

  
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