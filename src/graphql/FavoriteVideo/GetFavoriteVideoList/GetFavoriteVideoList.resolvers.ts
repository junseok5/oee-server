import checkUserAuth from "../../../middleware/checkUserAuth"
import FavoriteVideo, { IFavoriteVideoDoc } from "../../../models/FavoriteVideo"
import {
    GetFavoriteVideoListQueryArgs,
    GetFavoriteVideoListResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Query: {
        GetFavoriteVideoList: checkUserAuth(
            async (
                _,
                args: GetFavoriteVideoListQueryArgs,
                { req }
            ): Promise<GetFavoriteVideoListResponse> => {
                const userId = req.user._id
                const { page, num } = args

                try {
                    const videos: IFavoriteVideoDoc[] = await FavoriteVideo.findList(
                        userId,
                        page,
                        num
                    )

                    return {
                        ok: true,
                        error: null,
                        videos
                    }
                } catch (e) {
                    return {
                        ok: false,
                        error: e.message,
                        videos: null
                    }
                }
            }
        )
    }
}

export default resolvers
