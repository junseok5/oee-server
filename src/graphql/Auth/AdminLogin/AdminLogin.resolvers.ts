import {
    AdminLoginMutationArgs,
    AdminLoginResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Mutation: {
        AdminLogin: async (
            _,
            args: AdminLoginMutationArgs,
            { req }
        ): Promise<AdminLoginResponse> => {
            const { password } = args

            if (process.env.ADMIN_PASSWORD === password) {
                req.session.logged = true

                return {
                    ok: true,
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: "You input wrong password"
                }
            }
        }
    }
}

export default resolvers
