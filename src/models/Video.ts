import { Document, model, Schema } from "mongoose"

export interface IVideoDoc extends Document {
    _id: Schema.Types.ObjectId
    youtubeId: string
    title: string
    overayTime: string
    tags: [string]
    level: string
    private: boolean
    views: number
    createdAt: Date
    updatedAt: Date
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
    private: {
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

export default model<IVideoDoc>("Video", Video)
