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
//@ts-ignore
const multer_1 = __importDefault(require("multer"));
const Track_1 = __importDefault(require("../models/Track"));
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
router.post("/addFile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const form = formidable({multiples: false, uploadDir: './public'})
    // form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     //@ts-ignore
    //     next(err);
    //     return;
    //   }
    //   res.json({ files });
    // });
    var storage = multer_1.default.memoryStorage();
    const upload = multer_1.default({ dest: 'public/uploads/', storage: storage }).single('file');
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (!err) {
            //@ts-ignore
            const file = req.file;
            console.log('file', file);
            //console.log(file)
            const str = file.buffer.toString('utf-8');
            const track = new Track_1.default({
                name: file.originalname || 'defaultName',
                originalContent: str
            });
            track.save();
            yield track.save;
            return res.json({ track });
        }
    }));
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
