import { Resolvers } from "../../../types/resolvers"
import { AdminCheckResponse } from "../../../types/graph"

const resolvers: Resolvers = {
    Query: {
        AdminCheck: async (_, __, { req }): Promise<AdminCheckResponse> => {
            if (req.session.logged) {
                return {
                    ok: true,
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: "Not logged in."
                }
            }
        }
    }
}

export default resolvers
