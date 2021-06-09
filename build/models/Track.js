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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackCategories = void 0;
const mongoose_1 = __importStar(require("mongoose"));
class TrackCategories {
    constructor() {
        this.track = [];
        this.point = [];
    }
}
exports.TrackCategories = TrackCategories;
//https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
var TrackSchema = new mongoose_1.Schema({
    name: String,
    categories: {
        track: [String],
        point: [String]
    },
    geoJson: {},
    libraryIndexId: mongoose_1.default.Types.ObjectId,
    path: String,
    originalContent: mongoose_1.default.Types.ObjectId,
    date: {
        ms: Number,
        str: String
    }
});
// Compile model from schema
const Track = mongoose_1.default.model('Track', TrackSchema);
exports.default = Track;
