import cors from "cors"
import express, { Express } from "express"
import graphqlHTTP from "express-graphql"
import session from "express-session"
import helmet from "helmet"
import logger from "morgan"
import database from "./database"

class App {
    public app: Express
    private sessionConfig

    constructor() {
        this.app = express()
        this.sessionConfig = {
            secret: process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true, maxAge: 86400000 }
        }
        this.connectDB()
        this.middlewares()
        this.initiateGraphql()
    }

    private connectDB = (): void => {
        database.connect()
    }

    private middlewares = () => {
        this.app.set("trust proxy", 1)
        this.app.use(session(this.sessionConfig))
        this.app.use(cors())
        this.app.use(logger("dev"))
        this.app.use(helmet())
    }

    private initiateGraphql = () => {
        this.app.use("/graphql", graphqlHTTP({}))
    }
}

export default App
