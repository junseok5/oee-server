import { Document, model, Schema } from "mongoose"

export interface IVideoDoc extends Document {
    _id: string
    youtubeId: string
    title: string
    overayTime: string
    tags: [string]
    level: string
    private: boolean
    views: number
    subtitle: [
        {
            start: number
            end: number
            text: string
        }
    ]
    createdAt: string
    updatedAt: string
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
    subtitle: Array,
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
