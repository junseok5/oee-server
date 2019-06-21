import { Document, model, Schema } from "mongoose"

export interface ISubtitleContent {
    start: number
    end: number
    textContent: string
}

export interface ISubtitleDoc extends Document {
    _id: Schema.Types.ObjectId
    youtubeId: string
    en: ISubtitleContent[]
}

const Subtitle: Schema = new Schema({
    youtubeId: String,
    en: [
        {
            start: Number,
            end: Number,
            textContent: String
        }
    ]
})

export default model<ISubtitleDoc>("Subtitle", Subtitle)
