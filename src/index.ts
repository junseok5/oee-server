import { Options } from "graphql-yoga"
import App from "./app"
import "./env"

// SET VARIABLE
const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND_ENDPOINT: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"
const app = new App().app

const options: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
}

app.start(options, () => {
    console.log(`Listening on port ${PORT}`)
})
