import checkUserAuth from "../../../middleware/checkUserAuth"
import FavoriteVideo from "../../../models/FavoriteVideo"
import {
    AddFavoriteVideoMutationArgs,
    AddFavoriteVideoResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        AddFavoriteVideo: checkUserAuth(
            async (
                _,
                args: AddFavoriteVideoMutationArgs,
                { req }
            ): Promise<AddFavoriteVideoResponse> => {
                const { videoId } = args
                const { _id: userId } = req.user

                try {
                    new FavoriteVideo({
                        user: userId,
                        video: videoId
                    }).save()

                    return {
                        ok: true,
                        error: null
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
