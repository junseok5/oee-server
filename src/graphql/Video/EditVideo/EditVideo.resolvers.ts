import Video from "../../../models/Video"
import { EditVideoMutationArgs, EditVideoResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        EditVideo: async (
            _,
            args: EditVideoMutationArgs,
            { req }
        ): Promise<EditVideoResponse> => {
            // if (!req.session.logged) {
            //     return {
            //         ok: false,
            //         error: "Authentication failed"
            //     }
            // }

            const { id, patchData } = args

            try {
                await Video.findByIdAndUpdate(id, patchData)

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
