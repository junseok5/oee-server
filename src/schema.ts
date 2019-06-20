import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import path from "path"

const typesArray = fileLoader(path.join(__dirname, "./graphql/**/*.graphql"))
const resolversArray = fileLoader(
    path.join(__dirname, "./graphql/**/*.resolvers.*")
)

const mergedTypes = mergeTypes(typesArray)
const mergedResolvers = mergeResolvers(resolversArray)

const schema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedResolvers
})

export default schema
