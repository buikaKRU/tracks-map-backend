import { BeTrack, BeGeoJson } from './../BeInterface';
import { BeDateTrack} from '../BeInterface';
import GeoJson, {TrackCategories} from '../models/GeoJson';
import { v4 as uuidv4 } from 'uuid';


import express from 'express'
import { kml,kmlGen } from "@tmcw/togeojson";
//@ts-ignore
import multer from 'multer'


import {DOMParser} from 'xmldom'
import OriginalTrack from '../models/OriginalTrack';
import Track from '../models/Track';



const router = express.Router()
var storage = multer.memoryStorage()
const upload = multer({dest: 'public/uploads/', storage: storage }).single('file');



// /** get all tracks */
// router.get("/all", async (req, res) => {
//   // console.log('maybe??')
// 	const library = await Track.find();
// 	res.json({lenght: library.length, library})
//   //res.send('tracks')
// })


// /** get geoJson by id */
// router.get("/geojson/:id", async (req, res) => {
//   console.log('maybe??')
//   console.log(req.body.id)
//   const _id = req.params.id
//   if (_id) {
//     GeoJson.findById(_id)
//     .then((track:any)=> res.send(track))
//     .catch(() => {
//       res.status(404).json({error: 'id not found'})
//     })
//   } else {
//     res.status(404).json({error: 'no id provided, add {id: string} object to request'})
//   }
// })


router.patch("/edit/name/:trackId/:featureId", async (req, res) => {
  const trackId = req.params.trackId
  const featureId = req.params.featureId
  const updatedName = req.body.name
  console.log(trackId)
  console.log(featureId)


  const onErr = (message: string, nr?: number) => {
    res.status(nr || 500).json({ error: message })
  }

  const foundTrack: BeTrack | undefined = await Track.findById(trackId )
  if (foundTrack){

    const foundGeoJson: {geoJson: BeGeoJson} | undefined = await GeoJson.findById(foundTrack?.geoJsonId, null, {lean: true})
    if (foundGeoJson) {
      console.log(foundGeoJson)
      const allFeatures = foundGeoJson.geoJson.features
      const featureToUpdate= allFeatures.find(el => el.properties.uuid === featureId)
      if (!featureToUpdate) {
        onErr('feature not found', 404);
        return
      }
      featureToUpdate.properties.name = updatedName
      console.log(featureToUpdate.properties)
      await GeoJson.findByIdAndUpdate(foundTrack.geoJsonId, foundGeoJson).then(()=>{

        res.send('cool')
      }).catch(()=>{

        onErr('KUPA', 500)
      })


    } else {
      onErr('geoJson not found', 500)
    }
  } else {
    onErr('track not found', 404)
  }
  // .catch(()=> onErr('[patch feature name] something went wrong'))


  // console.log('[server][track/edit/name]', _id)
  // const updatedName = req.body.name
  // console.log('updatedName', req.body)
  // if (_id) {
  //   Track.findByIdAndUpdate(_id, {name: updatedName}, {new: true}, (err, result) => {
  //     if(err){
  //         res.status(404).json({error: err})
  //     }
  //     else {
  //       console.log(result.name)
  //       res.send(result.name)
  //     }
  //   })
  // }
})

router.patch("edit/feature/")


const tracks = router;

export default tracks
