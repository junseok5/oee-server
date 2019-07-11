import decodeJWT from "../utils/decodeJWT"

const checkJWT = async (req, res, next) => {
    const token = req.get("X-JWT")

    if (token) {
        const user = await decodeJWT(token)

        if (user) {
            req.user = user
        } else {
            req.user = null
        }
    }

    next()
}

export default checkJWT
