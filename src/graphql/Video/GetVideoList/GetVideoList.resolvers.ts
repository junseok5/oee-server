import Video, { IVideoDoc } from "../../../models/Video"
import {
    GetVideoListQueryArgs,
    GetVideoListResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Query: {
        GetVideoList: (
            _,
            args: GetVideoListQueryArgs,
            __
        ): Promise<GetVideoListResponse> | GetVideoListResponse => {
            const { page = 1, tag, keyword, level } = args

            if (page < 1) {
                return {
                    ok: false,
                    error: "Page must have more than 1",
                    videos: null
                }
            }

            let query: any = { isPublic: true }
            query = tag
                ? { ...query, tags: tag }
                : keyword
                ? {
                      ...query,
                      name: {
                          $regex: keyword,
                          $options: "i"
                      }
                  }
                : level
                ? {
                      ...query,
                      level
                  }
                : {
                      ...query
                  }

            try {
                const videos: IVideoDoc[] = Video.findList(query)

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
    }
}

export default resolvers
