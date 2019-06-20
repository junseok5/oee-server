import { Document, model, Schema } from "mongoose"

export interface IUserDoc extends Document {
    _id: Schema.Types.ObjectId
    email: string
    fbId?: string
    fbToken?: string
    googleId?: string
    googleToken?: string
    displayName: string
    thumbnail: string
    createdAt: Date
    updatedAt: Date
}

const User: Schema = new Schema({
    email: String,
    fbId: String,
    fbToken: String,
    googleId: String,
    googleToken: String,
    displayName: String,
    thumbnail: {
        type: String,
        default: "/img/default_profile.jpg"
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

export default model<IUserDoc>("User", User)
