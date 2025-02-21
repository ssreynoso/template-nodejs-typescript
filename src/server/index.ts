import http, { Server as HttpServer } from 'http'

import cors from 'cors'
import express, { Application } from 'express'

import { config } from '../config'
import { initializeRoutes } from '../router/api'

import errorHandlerMiddleware from '@/middlewares/error-handler'
import notFoundMiddleware from '@/middlewares/not-found'

export class Server {
    private app: Application
    private httpServer: HttpServer
    private port: string

    constructor() {
        this.app = express()
        this.httpServer = http.createServer(this.app)
        this.port = config.APP_PORT

        this.app.use(cors())
        this.app.use(express.json())
        initializeRoutes(this.app)
        this.app.use(errorHandlerMiddleware)
        this.app.use(notFoundMiddleware)
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
