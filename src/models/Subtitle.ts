import { Document, model, Schema } from "mongoose"

export interface ISubtitleContent {
    start: number
    end: number
    text: string
}

export interface ISubtitleDoc extends Document {
    _id: Schema.Types.ObjectId
    youtubeId: string
    language: string
    transcript: ISubtitleContent[]
}

const Subtitle: Schema = new Schema({
    youtubeId: String,
    language: String,
    transcript: [
        {
            start: Number,
            end: Number,
            text: String
        }
    ]
})

export default model<ISubtitleDoc>("Subtitle", Subtitle)
