import { Document, model, Model, Schema } from "mongoose"

export interface IFavoriteVideoDoc extends Document {
    _id: string
    user: string
    video: string
    createdAt: string
}

export interface IFavoriteVideoModel extends Model<IFavoriteVideoDoc> {
    findList: (userId: string, page: number, num: number) => IFavoriteVideoDoc[]
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

FavoriteVideo.statics.findList = function(userId, page, num) {
    return this.find({ user: userId })
        .sort({ _id: -1 })
        .limit(num)
        .skip((page - 1) * num)
        .populate({
            path: "video",
            model: "Video",
            select: "_id title overayTime level"
        })
        .lean()
}

export default model<IFavoriteVideoDoc>("FavoriteVideo", FavoriteVideo)
