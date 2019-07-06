import Video from "../../../models/Video"
import { AddVideoMutationArgs, AddVideoResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        AddVideo: async (
            _,
            args: AddVideoMutationArgs,
            { req }
        ): Promise<AddVideoResponse> => {
            if (!req.session.logged) {
                return {
                    ok: false,
                    error: "Authentication failed"
                }
            }

            try {
                const {
                    youtubeId,
                    title,
                    overayTime,
                    tags,
                    level,
                    private: isPrivate,
                    subtitle
                } = args

                const video = new Video({
                    youtubeId,
                    title,
                    overayTime,
                    tags,
                    level,
                    isPrivate,
                    subtitle
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
    }
}

export default resolvers
