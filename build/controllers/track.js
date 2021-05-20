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
const Track_1 = __importDefault(require("../models/Track"));
const formidable_1 = __importDefault(require("formidable"));
const router = express_1.default.Router();
// Get all posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('maybe??');
    const tracks = yield Track_1.default.find();
    res.send(tracks);
    //res.send('tracks')
}));
router.post("/addTest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const track = new Track_1.default({
        name: req.body.name || 'default'
    });
    track.save();
    yield track.save;
    res.send(track);
}));
//const upload = multer({dest: 'public/uploads/'}).single('file');
router.post("/addFile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = formidable_1.default({ multiples: false, uploadDir: './public' });
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
}));
const tracks = router;
exports.default = tracks;
