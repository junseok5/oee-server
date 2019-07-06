import { Document, model, Model, Schema } from "mongoose"

export interface IUserDoc extends Document {
    _id: Schema.Types.ObjectId
    email: string
    social: {
        facebook: {
            id: string
            accessToken: string
        }
        google: {
            id: string
            accessToken: string
        }
    }
    displayName: string
    thumbnail: string
    createdAt: Date
    updatedAt: Date
}

export interface IUserModel extends Model<IUserDoc> {
    findBySocialId: (provider: string, id: string) => IUserDoc | null
    socialRegister: (userForm: {
        email: string
        displayName: string
        thumbnail: string
        provider: string
        accessToken: string
        socialId: string
    }) => IUserDoc | null
}

const User: Schema = new Schema({
    email: String,
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
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

User.statics.findBySocialId = function(provider, id) {
    const key = `social.${provider}.id`

    return this.findOne({
        [key]: id
    })
}

User.statics.socialRegister = function({
    email,
    displayName,
    thumbnail,
    provider,
    accessToken,
    socialId
}) {
    const user = new this({
        email,
        displayName,
        thumbnail,
        social: {
            [provider]: {
                id: socialId,
                accessToken
            }
        }
    })

    return user.save()
}

export default model<IUserDoc, IUserModel>("User", User)
