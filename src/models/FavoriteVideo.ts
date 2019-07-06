import { Document, model, Schema } from "mongoose"

export interface IFavoriteVideoDoc extends Document {
    _id: string
    user: Schema.Types.ObjectId
    video: Schema.Types.ObjectId
    createdAt: string
}

const FavoriteVideo: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default model<IFavoriteVideoDoc>("FavoriteVideo", FavoriteVideo)
