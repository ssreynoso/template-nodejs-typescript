import express, { Application, Request, Response } from 'express'
import http, {Server as HttpServer} from 'http'
import cors from 'cors'
import { routerApi } from '../router/api'
import { config } from '../config'

export class Server {
    private app       : Application
    private httpServer: HttpServer
    private port      : string

    constructor() {
        this.app        = express()
        this.httpServer = http.createServer(this.app)
        this.port       = config.APP_PORT

        this.middlewares()
        this.routes()
        this.notFoundMiddleware()
    }

    private middlewares() {
        // CORS
        // this.app.use(cors({ origin: ['https://appv2.flexichatbot.com'] }))
        this.app.use(cors())
        this.app.use(express.json())
    }

    private routes() {
        routerApi(this.app)
    }

    private notFoundMiddleware() {
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({ error: 'not found' })
        })
    }

    listen() {
        try {
            this.httpServer.listen(this.port, () => {
                console.log(`Server running on http://localhost:${this.port}`)
            })
        } catch (error) {
            if (error instanceof Error) console.log(`Error occurred: ${error.message}`)
        }
    }
}
