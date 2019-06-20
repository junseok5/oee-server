import crypto from "crypto"

export default password => {
    return crypto
        .createHmac("sha256", process.env.PASSWORD_HASH_KEY || "")
        .update(password)
        .digest("hex")
}
