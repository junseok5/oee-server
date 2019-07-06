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
                /*
                    비디오 리스트를 조회시 자막데이터까지 디비단에서 같이 조회가 되어
                    동시 트래픽이 많아졌을시 성능 문제가 발생 가능.
                    비디오와 자막을 나눠야 한다.
                */
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
