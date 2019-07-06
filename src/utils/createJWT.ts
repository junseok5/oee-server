import jwt from "jsonwebtoken"
import { Schema } from "mongoose"

const createJWT = (id: Schema.Types.ObjectId) => {
    const token = jwt.sign(
        {
            id
        },
        process.env.JWT_TOKEN || ""
    )

    return token
}

export default createJWT
