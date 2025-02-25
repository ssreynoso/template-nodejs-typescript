import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@/config'
import { Unauthorized } from '@/errors'
import { SessionJWT } from '@/types/express'

export const jwtValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token

    req.session = { user: null }

    try {
        const data = jwt.verify(token, JWT_SECRET!) as SessionJWT

        req.session.user = data

        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            next(new Unauthorized('Token expired'))
        }

        if (error instanceof jwt.JsonWebTokenError) {
            next(new Unauthorized('Unauthorized'))
            return
        }

        next(error)
    }
}
