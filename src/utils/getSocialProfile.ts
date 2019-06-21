import fb from "fb"
import { google } from "googleapis"

const getFacebookProfile = accessToken => {
    return fb.api(
        "me",
        {
            fields: ["name", "email", "picture"],
            access_token: accessToken
        },
        res => ({
            id: res.id,
            name: res.name,
            email: res.email || null,
            thumbnail: res.picture.data.url
        })
    )
}

const getGoogleProfile = accessToken => {
    const plus = google.plus({
        version: "v1",
        auth: "Here Google Secret Code"
    })

    return new Promise((resolve, reject) => {
        plus.people.get(
            {
                userId: "me",
                oauth_token: accessToken
            },
            (err, auth) => {
                if (err) {
                    reject(err)
                    return
                }

                const { id, image, emails, displayName } = auth.data
                const profile = {
                    id,
                    thumbnail: image.url,
                    email: emails[0].value,
                    name: displayName && displayName.split(" (")[0]
                }

                resolve(profile)
            }
        )
    })
}

const getProfile = (provider, accessToken) => {
    const getters = {
        facebook: getFacebookProfile,
        google: getGoogleProfile
    }

    return getters[provider](accessToken)
}

export default getProfile
