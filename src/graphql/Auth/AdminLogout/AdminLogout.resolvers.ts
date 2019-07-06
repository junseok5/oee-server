import { AdminLogoutResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        AdminLogout: async (_, __, { req }): Promise<AdminLogoutResponse> => {
            if (!req.session.logged) {
                return {
                    ok: false,
                    error: "Already logout"
                }
            } else {
                req.session.logged = null

                return {
                    ok: true,
                    error: null
                }
            }
        }
    }
}

export default resolvers
