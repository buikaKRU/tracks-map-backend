import { GeoJson } from './../GeoJson';


import express from 'express'
import { kml,kmlGen } from "@tmcw/togeojson";
//@ts-ignore
import multer from 'multer'
import GJson, {DateTrack, TrackCategories} from '../models/GeoJson'


import {DOMParser} from 'xmldom'
import OriginalTrack from '../models/OriginalTrack';
import Track from '../models/Track';



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



/** get all tracks */
router.get("/all", async (req, res) => {
  // console.log('maybe??')
	const library = await Track.find();
	res.json({lenght: library.length, library})
  //res.send('tracks')
})


/** get geoJson by id */
router.get("/geojson/:id", async (req, res) => {
  console.log('maybe??')
  console.log(req.body.id)
  const _id = req.params.id
  if (_id) {
    GJson.findById(_id)
    .then((track:any)=> res.send(track))
    .catch(() => {
      res.status(404).json({error: 'id not found'})
    })
  } else {
    res.status(404).json({error: 'no id provided, add {id: string} object to request'})
  }
})


router.patch("/edit/name/:id", async (req, res) => {
  const _id = req.params.id
  console.log('[server][track/edit/name]', _id)
  const updatedName = req.body.name
  console.log('updatedName', req.body)
  if (_id) {
    Track.findByIdAndUpdate(_id, {name: updatedName}, {new: true}, (err, result) => {
      if(err){
          res.status(404).json({error: err})
      }
      else {
        console.log(result.name)
        res.send(result.name)
      }
    })
  }
})


router.post("/addFile", async (req, res) => {
  
  upload(req,res, async (err: any) => {
    
    if (!err) {
      //@ts-ignore
      const file = await req.file;
      const fileName = file.originalname?.split('.')[0] || 'default name'
      const fileFormat: 'gpx' | 'kml' = file.originalname.split('.')[1];
      let date: DateTrack = 
      {
        ms: 0,
        str: '1970-01-01'
      }

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
        
        const gjson = new GJson({
          geoJson: geoJson,
        })
        
        const track = new Track({
          name: fileName,
          path: 'root/',
          categories: categories,
          tags: ['testTag1', 'testTag2'],
          description: '',
          date: date,
          geoJsonId: gjson._id,
          originalContentId: originalTrack._id,
        })
        
        await originalTrack.save();
        await gjson.save();
        await track.save();
  
        // return res.status(500).json( {error: 'some error'})
        return res.json( gjson.geoJson );
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
