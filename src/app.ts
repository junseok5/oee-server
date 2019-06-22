import cors from "cors"
import express, { Express } from "express"
import graphqlHTTP from "express-graphql"
import helmet from "helmet"
import logger from "morgan"
import database from "./database"

class App {
    public app: Express = express()

    constructor() {
        this.connectDB()
        this.middlewares()
        this.initiateGraphql()
    }

    private connectDB = (): void => {
        database.connect()
    }

    private middlewares = () => {
        this.app.use(cors())
        this.app.use(logger("dev"))
        this.app.use(helmet())
    }

    private initiateGraphql = () => {
        this.app.use("/graphql", graphqlHTTP({}))
    }
}

export default App
