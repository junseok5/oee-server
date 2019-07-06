import User, { IUserDoc } from "../../../models/User"
import {
    SocialLoginMutationArgs,
    SocialLoginResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT"
import getSocialProfile from "../../../utils/getSocialProfile"

const resolvers: Resolvers = {
    Mutation: {
        SocialLogin: async (
            _,
            args: SocialLoginMutationArgs,
            { req }
        ): Promise<SocialLoginResponse> => {
            const { provider, accessToken } = args

            let profile = { id: "", email: "", name: "", thumbnail: "" }

            try {
                profile = await getSocialProfile(provider, accessToken)

                if (!profile) {
                    return {
                        ok: false,
                        error: "Cannot find social profile.",
                        token: null
                    }
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e.message,
                    token: null
                }
            }

            let user: IUserDoc | null = null

            try {
                user = await User.findBySocialId(provider, profile.id)
            } catch (e) {
                return {
                    ok: false,
                    error: e.message,
                    token: null
                }
            }

            if (user) {
                try {
                    const token = await createJWT(user._id)

                    return {
                        ok: true,
                        error: null,
                        token
                    }
                } catch (e) {
                    return {
                        ok: false,
                        error: e.message,
                        token: null
                    }
                }
            }

            if (!user && profile.email) {
                let duplicated: IUserDoc | null = null

                try {
                    duplicated = await User.findOne({ email: profile.email })
                } catch (e) {
                    return {
                        ok: false,
                        error: e.message,
                        token: null
                    }
                }

                if (duplicated) {
                    duplicated.social[provider] = {
                        id: profile.id,
                        accessToken
                    }

                    try {
                        await duplicated.save()
                    } catch (e) {
                        return {
                            ok: false,
                            error: e.message,
                            token: null
                        }
                    }

                    try {
                        const token = await createJWT(duplicated._id)

                        return {
                            ok: true,
                            error: null,
                            token
                        }
                    } catch (e) {
                        return {
                            ok: false,
                            error: e.message,
                            token: null
                        }
                    }
                } else {
                    // not duplicated, new regist
                    try {
                        user = await User.socialRegister({
                            email: profile.email,
                            displayName: profile.name,
                            thumbnail: profile.thumbnail,
                            provider,
                            accessToken,
                            socialId: profile.id
                        })

                        if (user) {
                            const token = await createJWT(user._id)

                            return {
                                ok: true,
                                error: null,
                                token
                            }
                        } else {
                            return {
                                ok: false,
                                error: "New user save failed.",
                                token: null
                            }
                        }
                    } catch (e) {
                        return {
                            ok: false,
                            error: e.message,
                            token: null
                        }
                    }
                }
            }

            return {
                ok: false,
                error: "Sorry. Unknown server error.",
                token: null
            }
        }
    }
}

export default resolvers
