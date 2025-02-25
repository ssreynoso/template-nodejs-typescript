import express, { Application } from 'express'

import { jwtValidation } from '@/middlewares/jwt-validation'
import authRouter from '@/modules/auth/router'
import usersRouter from '@/modules/users/router'
import generalRouter from '@/router/api/general.router'

export const initializeRoutes = function (app: Application) {
    const router_api_v1 = express.Router()

    app.use('/api/v1', router_api_v1)

    router_api_v1.use('/', generalRouter)
    router_api_v1.use('/auth', authRouter)

    // Protecting the routes below
    router_api_v1.use(jwtValidation)

    router_api_v1.use('/users', usersRouter)

    // router_api_v1.use('/<entity>', entity_router);
}
