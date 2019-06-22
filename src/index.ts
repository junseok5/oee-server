import App from "./app"
import "./env"

const { PORT: port } = process.env
const app = new App().app

app.listen(port, () => {
    console.log(`Listening graphql server on port ${port}`)
})
