import checkAdminAuth from "../../../middleware/checkAdminAuth"
import Video from "../../../models/Video"
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

                try {
                    await Video.findByIdAndRemove(id)

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
