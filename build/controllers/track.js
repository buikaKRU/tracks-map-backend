"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const togeojson_1 = require("@tmcw/togeojson");
//@ts-ignore
const multer_1 = __importDefault(require("multer"));
const Track_1 = __importDefault(require("../models/Track"));
const xmldom_1 = require("xmldom");
const OriginalTrack_1 = __importDefault(require("../models/OriginalTrack"));
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
var storage = multer_1.default.memoryStorage();
const upload = multer_1.default({ dest: 'public/uploads/', storage: storage }).single('file');
const router = express_1.default.Router();
// Get all posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('maybe??');
    const tracks = yield Track_1.default.find();
    const tracksGeoJsons = [];
    tracks.forEach((tr) => tracksGeoJsons.push(tr.geoJson));
    res.send(tracksGeoJsons);
    //res.send('tracks')
}));
router.post("/addTest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const track = new Track_1.default({
        name: req.body.name || 'default'
    });
    yield track.save();
    res.send(track);
}));
router.post("/addFile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!err) {
            //@ts-ignore
            const file = yield req.file;
            const fileName = (_a = file.originalname) === null || _a === void 0 ? void 0 : _a.split('.')[0];
            const fileFormat = file.originalname.split('.')[1];
            console.log('--------- fileFormat', fileFormat);
            const categories = [];
            //console.log(file)
            const str = file.buffer.toString('utf-8');
            if (fileFormat === 'kml') {
                const kmlParsed = new xmldom_1.DOMParser().parseFromString(str);
                const geoJson = togeojson_1.kml(kmlParsed);
                geoJson.features.forEach(feature => {
                    console.log('category', feature.properties.name, feature.properties.Category);
                    categories.push(feature.properties.Category);
                });
                console.log('categories', categories);
                const originalTrack = new OriginalTrack_1.default({
                    originalName: fileName || '',
                    originalContent: str,
                    format: fileFormat
                });
                yield originalTrack.save();
                const track = new Track_1.default({
                    name: fileName || 'defaultName',
                    categories: categories,
                    geoJson: geoJson,
                    originalContent: originalTrack._id
                    //originalContent: str
                });
                yield track.save();
                // return res.status(500).json( {error: 'some error'})
                return res.json(track.geoJson);
            }
            else {
                res.status(500).json({ error: 'gpx file format is not supported' });
            }
        }
    }));
}));
const tracks = router;
exports.default = tracks;
