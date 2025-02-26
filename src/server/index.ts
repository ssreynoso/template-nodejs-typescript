import http, { Server as HttpServer } from 'http'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'

import { APP_PORT } from '@/config'
import errorHandlerMiddleware from '@/middlewares/error-handler'
import notFoundMiddleware from '@/middlewares/not-found'
import { initializeRoutes } from '@/router/api'

export class Server {
    private app: Application
    private httpServer: HttpServer
    private port: string

    constructor() {
        this.app = express()
        this.httpServer = http.createServer(this.app)
        this.port = APP_PORT

        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(cookieParser())
        initializeRoutes(this.app)
        this.app.use(errorHandlerMiddleware)
        this.app.use(notFoundMiddleware)
    }

    getApp() {
        return this.app
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
