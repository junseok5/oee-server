import jwt from "jsonwebtoken"
import User, { IUserDoc } from "../models/User"

const decodeJWT = async (token: string): Promise<IUserDoc | null> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "")
        const { id } = decoded
        const user = await User.findById(id)

        return user
    } catch (e) {
        return null
    }
}

export default decodeJWT
