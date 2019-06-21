import { Document, model, Schema } from "mongoose"

export interface IFavoriteVideoDoc extends Document {
    _id: Schema.Types.ObjectId
    user: Schema.Types.ObjectId
    video: Schema.Types.ObjectId
    createdAt: Date
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
