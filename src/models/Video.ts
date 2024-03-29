import { Document, model, Model, Schema } from "mongoose"
import { ISubtitleDoc } from "./Subtitle";

export interface IVideoDoc extends Document {
    _id: string
    youtubeId: string
    title: string
    overayTime: string
    tags: string[] | null
    level: string
    isPublic: boolean
    views: number
    subtitle: ISubtitleDoc
    createdAt: string
    updatedAt: string
}

export interface IVideoModel extends Model<IVideoDoc> {
    findList: (object, page: number) => IVideoDoc[]
}

const Video: Schema = new Schema({
    youtubeId: String,
    title: {
        type: String,
        index: true
    },
    overayTime: String,
    tags: [String],
    level: String,
    isPublic: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    subtitle: {
        type: Schema.Types.ObjectId,
        ref: "Subtitle"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

Video.statics.findList = function(query, page) {
    return this.find(query)
        .sort({ score: "desc" })
        .limit(20)
        .skip((page - 1) * 20)
        .populate({
            path: "subtitle",
            model: "Subtitle",
            select: "transcript"
        })
        .lean()
}

export default model<IVideoDoc, IVideoModel>("Video", Video)
