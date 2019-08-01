import Video, { IVideoDoc } from "../../../models/Video"
import {
    GetVideoListQueryArgs,
    GetVideoListResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Query: {
        GetVideoList: async (
            _,
            args: GetVideoListQueryArgs,
            __
        ): Promise<GetVideoListResponse> => {
            const { page = 1, tag, keyword, level } = args

            if (page < 1) {
                return {
                    ok: false,
                    error: "Page must have more than 1",
                    videos: null,
                    pageCount: 0
                }
            }

            let query: any = { isPublic: true }
            query = tag
                ? { ...query, tags: tag }
                : keyword
                ? {
                      ...query,
                      title: {
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
                const videos: IVideoDoc[] = await Video.findList(query, page)
                const count: number = await Video.countDocuments(query)

                return {
                    ok: true,
                    error: null,
                    videos,
                    pageCount: Math.floor(count / 20)
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e.message,
                    videos: null,
                    pageCount: 0
                }
            }
        }
    }
}

export default resolvers
