import checkAdminAuth from "../../../middleware/checkAdminAuth"
import Subtitle, { ISubtitleDoc } from "../../../models/Subtitle"
import Video, { IVideoDoc } from "../../../models/Video"
import { AddVideoMutationArgs, AddVideoResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        AddVideo: checkAdminAuth(
            async (
                _,
                args: AddVideoMutationArgs,
                __
            ): Promise<AddVideoResponse> => {
                try {
                    const {
                        youtubeId,
                        title,
                        overayTime,
                        tags,
                        level,
                        isPublic,
                        transcript
                    } = args

                    const video: IVideoDoc | null = await Video.findOne({
                        youtubeId
                    })

                    if (video) {
                        return {
                            ok: false,
                            error: "Video already exist."
                        }
                    }

                    const subtitle: ISubtitleDoc = await new Subtitle({
                        transcript
                    }).save()

                    await new Video({
                        youtubeId,
                        title,
                        overayTime,
                        tags,
                        level,
                        isPublic,
                        subtitle
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
