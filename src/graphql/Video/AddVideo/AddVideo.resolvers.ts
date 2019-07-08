import checkAdminAuth from "../../../middleware/checkAdminAuth"
import Subtitle, { ISubtitleDoc } from "../../../models/Subtitle"
import Video from "../../../models/Video"
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

                    const subtitle: ISubtitleDoc = await new Subtitle({
                        transcript
                    }).save()

                    const video = new Video({
                        youtubeId,
                        title,
                        overayTime,
                        tags,
                        level,
                        isPublic,
                        subtitle: subtitle._id
                    })

                    await video.save()

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
