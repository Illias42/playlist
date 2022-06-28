"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_service_1 = require("../file/file.service");
const comment_schema_1 = require("./schemas/comment.schema");
const track_schema_1 = require("./schemas/track.schema");
let TrackService = class TrackService {
    constructor(trackModel, commentModel, fileService) {
        this.trackModel = trackModel;
        this.commentModel = commentModel;
        this.fileService = fileService;
    }
    create(dto, picture, audio) {
        return __awaiter(this, void 0, void 0, function* () {
            const picturePath = yield this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
            const audioPath = yield this.fileService.createFile(file_service_1.FileType.AUDIO, audio);
            const track = this.trackModel.create(Object.assign(Object.assign({}, dto), { listens: 0, audio: audioPath, picture: picturePath }));
            return track;
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const tracks = yield this.trackModel.find({
                name: { $regex: new RegExp(query, 'i') },
            });
            return tracks;
        });
    }
    getAll(count = 10, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const tracks = yield this.trackModel
                .find()
                .skip(Number(offset))
                .limit(Number(count));
            return tracks;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            const track = yield this.trackModel.findById(id).populate('comments');
            console.log(track);
            return track;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield this.trackModel.findByIdAndDelete(id);
            return track._id;
        });
    }
    addComment(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield this.trackModel.findById(dto.trackId);
            const comment = yield this.commentModel.create(Object.assign({}, dto));
            track.comments.unshift(comment);
            yield track.save();
            return comment;
        });
    }
    listen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield this.trackModel.findById(id);
            track.listens += 1;
            track.save();
        });
    }
};
TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(track_schema_1.Track.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService])
], TrackService);
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map