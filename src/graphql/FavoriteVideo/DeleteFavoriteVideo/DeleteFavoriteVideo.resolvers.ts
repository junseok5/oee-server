import { Types } from "mongoose"
import checkUserAuth from "../../../middleware/checkUserAuth"
import FavoriteVideo, { IFavoriteVideoDoc } from "../../../models/FavoriteVideo"
import {
    DeleteFavoriteVideoMutationArgs,
    DeleteFavoriteVideoResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        DeleteFavoriteVideo: checkUserAuth(
            async (
                _,
                args: DeleteFavoriteVideoMutationArgs,
                { req }
            ): Promise<DeleteFavoriteVideoResponse> => {
                const { id } = args
                let { _id: userId } = req.user

                try {
                    const favoriteVideo: IFavoriteVideoDoc | null = await FavoriteVideo.findById(
                        id
                    )

                    if (favoriteVideo) {
                        const userIdInDoc = Types.ObjectId(favoriteVideo.user)
                        userId = Types.ObjectId(userId)

                        if (userIdInDoc.equals(userId)) {
                            await favoriteVideo.remove()

                            return {
                                ok: true,
                                error: null
                            }
                        } else {
                            return {
                                ok: false,
                                error: "Forbidden authentication."
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Video not found."
                        }
                    }
                } catch (e) {
                    return {
                        ok: false,
                        error: e.message
                    }
                }
            }
        )
    }
}

export default resolvers
