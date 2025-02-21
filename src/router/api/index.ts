import express, { Application } from 'express'

import authRouter from '@/modules/auth/router'
import generalRouter from '@/router/api/general.router'

export const initializeRoutes = function (app: Application) {
    const router_api_v1 = express.Router()

    app.use('/api/v1', router_api_v1)

    router_api_v1.use('/', generalRouter)
    router_api_v1.use('/', authRouter)

    // router_api_v1.use('/<entity>', entity_router);
}
