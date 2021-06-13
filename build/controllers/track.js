"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const GeoJson_1 = __importStar(require("../models/GeoJson"));
const xmldom_1 = require("xmldom");
const OriginalTrack_1 = __importDefault(require("../models/OriginalTrack"));
const Track_1 = __importDefault(require("../models/Track"));
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
const router = express_1.default.Router();
var storage = multer_1.default.memoryStorage();
const upload = multer_1.default({ dest: 'public/uploads/', storage: storage }).single('file');
/** get all tracks */
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('maybe??');
    const library = yield Track_1.default.find();
    res.json({ lenght: library.length, library });
    //res.send('tracks')
}));
/** get geoJson by id */
router.get("/geojson/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('maybe??');
    console.log(req.body.id);
    const _id = req.params.id;
    if (_id) {
        GeoJson_1.default.findById(_id)
            .then((track) => res.send(track))
            .catch(() => {
            res.status(404).json({ error: 'id not found' });
        });
    }
    else {
        res.status(404).json({ error: 'no id provided, add {id: string} object to request' });
    }
}));
// router.post("/addTest", async (req, res) => {
//   const track = new Track({
//     name: req.body.name || 'default'
//   })
//   await track.save();
//   res.send(track);
// })
router.post("/addFile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!err) {
            //@ts-ignore
            const file = yield req.file;
            const fileName = ((_a = file.originalname) === null || _a === void 0 ? void 0 : _a.split('.')[0]) || 'default name';
            const fileFormat = file.originalname.split('.')[1];
            let date = {
                ms: 0,
                str: '1970-01-01'
            };
            console.log('--------- fileFormat', fileFormat);
            const categories = new GeoJson_1.TrackCategories();
            //console.log(file)
            const str = file.buffer.toString('utf-8');
            if (fileFormat === 'kml') {
                const kmlParsed = new xmldom_1.DOMParser().parseFromString(str);
                const geoJson = togeojson_1.kml(kmlParsed);
                // categories and date
                geoJson.features.forEach(feature => {
                    var _a, _b;
                    const featureType = (_a = feature.geometry) === null || _a === void 0 ? void 0 : _a.type;
                    // categories
                    const featureCategory = feature.properties.Category;
                    console.log('featureType', featureType);
                    console.log('category', featureCategory);
                    if ((featureCategory === null || featureCategory === void 0 ? void 0 : featureCategory.length) > 0) {
                        featureType === "Point" && categories.point.indexOf(featureCategory) === -1 && categories.point.push(featureCategory);
                        featureType === "LineString" && categories.track.indexOf(featureCategory) === -1 && categories.track.push(featureCategory);
                    }
                    // date
                    if (!!!date && featureType === 'LineString') {
                        const dateString = (_b = feature.properties.timespan) === null || _b === void 0 ? void 0 : _b.begin;
                        !!dateString && (date = { str: dateString.split('T')[0], ms: Date.parse(dateString) });
                    }
                });
                console.log('categories', categories);
                console.log('date', date);
                // add original track
                const originalTrack = new OriginalTrack_1.default({
                    originalName: fileName,
                    originalContent: str,
                    format: fileFormat
                });
                const gjson = new GeoJson_1.default({
                    geoJson: geoJson,
                });
                const track = new Track_1.default({
                    name: fileName,
                    path: 'root/',
                    categories: categories,
                    date: date,
                    geoJsonId: gjson._id,
                    originalContentId: originalTrack._id,
                });
                yield originalTrack.save();
                yield gjson.save();
                yield track.save();
                // return res.status(500).json( {error: 'some error'})
                return res.json(gjson.geoJson);
            }
            else {
                res.status(500).json({ error: 'gpx file format is not supported' });
            }
        }
        else {
            res.status(500).json({ error: 'upload error' });
        }
    }));
}));
const tracks = router;
exports.default = tracks;
