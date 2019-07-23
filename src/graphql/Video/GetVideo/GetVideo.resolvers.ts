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
                        // subtitle: null
                    }
                } else {
                    // const subtitle = video.subtitle
                    // video.subtitle = "subtitle"
                    return {
                        ok: true,
                        error: null,
                        video
                        // subtitle
                    }
                }
            } catch (e) {
                return {
                    ok: false,
                    error: e.message,
                    video: null
                    // subtitle: null
                }
            }
        }
    }
}

export default resolvers
