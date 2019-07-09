import Video, { IVideoDoc } from "../../../models/Video"
import { GetVideoQueryArgs, GetVideoResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Query: {
        GetVideo: async (
            _,
            args: GetVideoQueryArgs,
            __
        ): Promise<GetVideoResponse> => {
            const { id } = args

            try {
                const video: IVideoDoc | null = await Video.findById(
                    id
                ).populate("subtitle")

                if (!video) {
                    return {
                        ok: false,
                        error: "Video not found.",
                        video: null
                    }
                } else {
                    return {
                        ok: true,
                        error: null,
                        video
                    }
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e.message,
                    video: null
                }
            }
        }
    }
}

export default resolvers
