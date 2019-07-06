import checkAdminAuth from "../../../middleware/checkAdminAuth"
import Video from "../../../models/Video"
import { EditVideoMutationArgs, EditVideoResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        EditVideo: checkAdminAuth(
            async (
                _,
                args: EditVideoMutationArgs,
                __
            ): Promise<EditVideoResponse> => {
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
        )
    }
}

export default resolvers
