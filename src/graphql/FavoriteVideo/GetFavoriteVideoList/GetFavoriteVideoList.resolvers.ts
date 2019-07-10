import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
    Query: {
        GetFavoriteVideoList: checkUserAuth((_, args, { req }) => {
            
        })
    }
}

export default resolvers
