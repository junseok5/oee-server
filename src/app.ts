import cors from "cors"
import express, { Express } from "express"
import graphqlHTTP from 'express-graphql'
import helmet from "helmet"
import logger from "morgan"

class App {
  public app: Express = express()

  constructor() {
    this.middlewares()
  }

  private middlewares = () => {
    this.app.use(cors())
    this.app.use(logger("dev"))
    this.app.use(helmet())
    this.initiateGraphql()
  }

  private initiateGraphql = () => {
    this.app.use("/graphql", graphqlHTTP({
      
    }))
  }
}

export default App
