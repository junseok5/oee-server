import cors from "cors"
import session from "express-session"
import { GraphQLServer } from "graphql-yoga"
import { ContextParameters } from "graphql-yoga/dist/types"
import helmet from "helmet"
import logger from "morgan"
import database from "./database"
import checkJWT from "./middleware/checkJWT"
import schema from "./schema"

class App {
    public app: GraphQLServer
    private sessionConfig

    constructor() {
        this.app = new GraphQLServer({
            schema,
            context: (req: ContextParameters) => ({
                req: req.request
            })
        })
        this.sessionConfig = {
            secret: process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false, maxAge: 86400000 },
            httpOnly: false
        }
        this.connectDB()
        this.runMiddlewares()
    }

    private connectDB = (): void => {
        database.connect()
    }

    private runMiddlewares = () => {
        this.app.express.set("trust proxy", true)
        this.app.express.use(session(this.sessionConfig))
        this.app.express.use(cors({ origin: true, credentials: true }))
        this.app.express.use(logger("dev"))
        this.app.express.use(helmet())
        this.app.express.use(checkJWT)
    }
}

export default App
