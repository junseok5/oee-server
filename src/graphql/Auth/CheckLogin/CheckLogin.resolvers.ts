import { Resolvers } from "../../../types/resolvers"
import checkUserAuth from "../../../middleware/checkUserAuth"
import { CheckLoginResponse } from "../../../types/graph"

const resolvers: Resolvers = {
    Query: {
        CheckLogin: checkUserAuth(
            async (_, __, { req }): Promise<CheckLoginResponse> => {
                return {
                    ok: true,
                    error: null,
                    user: req.user
                }
            }
        )
    }
}

export default resolvers
