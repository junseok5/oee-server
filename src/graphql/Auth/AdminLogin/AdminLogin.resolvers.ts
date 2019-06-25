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
            console.log(password, process.env.adminPassword)

            if (process.env.adminPassword === password) {
                req.logged = true

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
