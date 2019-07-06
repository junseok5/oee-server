import Video from "../../../models/Video"
import {
    DeleteVideoMutationArgs,
    DeleteVideoResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        DeleteVideo: async (
            _,
            args: DeleteVideoMutationArgs,
            { req }
        ): Promise<DeleteVideoResponse> => {
            // if (!req.session.logged) {
            //     return {
            //         ok: false,
            //         error: "Authentication failed"
            //     }
            // }

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
    }
}

export default resolvers
