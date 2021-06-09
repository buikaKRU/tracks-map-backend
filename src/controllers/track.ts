import { GeoJson } from './../GeoJson';


import express from 'express'
import { kml,kmlGen } from "@tmcw/togeojson";
//@ts-ignore
import multer from 'multer'
import Track, {DateTrack, TrackCategories} from '../models/Track'


import {DOMParser} from 'xmldom'
import OriginalTrack from '../models/OriginalTrack';
import LibraryIndex from '../models/LibraryIndex';



// const str = kmlMockupString();
// const categories: string[] = []
    
// const kmlParsed = new DOMParser().parseFromString(str);
// // console.log('-----------------', kmlParsed)
// const geoJson: GeoJson = kml(kmlParsed);
// geoJson.features.forEach(feature => {
//   console.log('category', feature.properties.name, feature.properties.Category)
//   categories.push(feature.properties.Category);
// })

// console.log('categories', categories)

// const track = new Track({
//   name: 'new track with categories',
//   categories: categories,
//   geoJson: geoJson,
//   originalContent: str,
// })
// track.save();


const router = express.Router()
var storage = multer.memoryStorage()
const upload = multer({dest: 'public/uploads/', storage: storage }).single('file');



/** DEPRECATED get all tracks */
router.get("/all", async (req, res) => {
  console.log('maybe??')
	const foundTracks = await Track.find();
	res.json({lenght: foundTracks.length, foundTracks})
  //res.send('tracks')
})


/** get track by id */
router.get("/:id", async (req, res) => {
  console.log('maybe??')
  console.log(req.body.id)
  const _id = req.params.id
  if (_id) {
    Track.findById(_id)
    .then((track:any)=> res.send(track))
    .catch(() => {
      res.status(404).json({error: 'id not found'})
    })
  } else {
    res.status(404).json({error: 'no id provided, add {id: string} object to request'})
  }
})

// router.post("/addTest", async (req, res) => {
  
//   const track = new Track({
//     name: req.body.name || 'default'
    
//   })
//   await track.save();
//   res.send(track);
// })



router.post("/addFile", async (req, res) => {
  
  upload(req,res, async (err: any) => {
    
    if (!err) {
      //@ts-ignore
      const file = await req.file;
      const fileName = file.originalname?.split('.')[0] || 'default name'
      const fileFormat: 'gpx' | 'kml' = file.originalname.split('.')[1];
      let date: DateTrack = 
      // {
      //   ms: 0,
      //   str: '1970-01-01'
      // }

      console.log('--------- fileFormat', fileFormat)

      const categories = new TrackCategories()
      //console.log(file)
      const str = file.buffer.toString('utf-8')
      
      if (fileFormat === 'kml') { 

        const kmlParsed = new DOMParser().parseFromString(str);
        const geoJson: GeoJson = kml(kmlParsed);
        
        // categories and date
        geoJson.features.forEach(feature => {
          const featureType = feature.geometry?.type
          // categories
          const featureCategory = feature.properties.Category;
          console.log('featureType', featureType)
          console.log('category', featureCategory)
          if (featureCategory?.length>0) {
            featureType==="Point" && categories.point.indexOf(featureCategory) === -1 && categories.point.push(featureCategory)
            featureType==="LineString" && categories.track.indexOf(featureCategory) === -1 && categories.track.push(featureCategory)
          }
          // date
          if (!!!date && featureType === 'LineString') {
            const dateString = feature.properties.timespan?.begin;
            !!dateString && (date = {str: dateString.split('T')[0], ms: Date.parse(dateString)})
          }
        })

        
  
        console.log('categories', categories)
        console.log('date', date)

        // add original track
        const originalTrack = new OriginalTrack({
          originalName: fileName,
          originalContent: str,
          format: fileFormat
        })
        
        const libraryIndex = new LibraryIndex({
          name: fileName,
          path: 'root/',
          categories: categories,
          date: date
        })
    
        const track = new Track({
          name: fileName,
          path: 'root/',
          date: date,
          categories: categories,
          originalContent: originalTrack._id,
          libraryIndexId: libraryIndex._id,
          geoJson: geoJson,
        })

        libraryIndex.trackId = track._id

        await originalTrack.save();
        await track.save();
        await libraryIndex.save();
  
        // return res.status(500).json( {error: 'some error'})
        return res.json( track.geoJson );
      } else {

        res.status(500).json({ error: 'gpx file format is not supported' })
      }
      
    } else {
      res.status(500).json({ error: 'upload error' })
      
    }
  })
  
})

const tracks = router;

export default tracks
