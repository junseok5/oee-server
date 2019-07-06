import jwt from "jsonwebtoken"

const createJWT = (id: string) => {
    const token = jwt.sign(
        {
            id
        },
        process.env.JWT_TOKEN || ""
    )

    return token
}

export default createJWT
