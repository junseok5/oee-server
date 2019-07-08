import { Document, model, Schema } from "mongoose"

export interface ITranscript {
    start: number
    end: number
    textContent: string
}

export interface ISubtitleDoc extends Document {
    _id: string
    transcript: ITranscript[]
}

const Subtitle: Schema = new Schema({
    transcript: [
        {
            start: Number,
            end: Number,
            textContent: String
        }
    ]
})

export default model<ISubtitleDoc>("Subtitle", Subtitle)
