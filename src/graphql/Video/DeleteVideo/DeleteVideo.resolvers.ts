import checkAdminAuth from "../../../middleware/checkAdminAuth"
import Subtitle from "../../../models/Subtitle"
import Video, { IVideoDoc } from "../../../models/Video"
import {
    DeleteVideoMutationArgs,
    DeleteVideoResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        DeleteVideo: checkAdminAuth(
            async (
                _,
                args: DeleteVideoMutationArgs,
                __
            ): Promise<DeleteVideoResponse> => {
                const { id } = args

                let video: IVideoDoc | null = null
                try {
                    video = await Video.findById(id)
                } catch (e) {
                    return {
                        ok: false,
                        error: e.message
                    }
                }

                if (video) {
                    try {
                        await Subtitle.findByIdAndRemove(video.subtitle)
                        await video.remove()

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
                } else {
                    return {
                        ok: false,
                        error: "Not found video."
                    }
                }
            }
        )
    }
}

export default resolvers
