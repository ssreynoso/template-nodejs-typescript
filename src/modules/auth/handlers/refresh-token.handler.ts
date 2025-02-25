import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { cookieOptions } from '../lib/cookie-options'
import { generateUserAccessToken } from '../services/generate-user-tokens'

import { JWT_REFRESH_SECRET } from '@/config'
import { Unauthorized } from '@/errors'
import { SessionJWT } from '@/types/express'

export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refresh_token

    try {
        const refreshData = jwt.verify(refreshToken, JWT_REFRESH_SECRET!) as SessionJWT

        const newAccessToken = generateUserAccessToken({ id: refreshData.id, username: refreshData.username })

        res.cookie('access_token', newAccessToken, cookieOptions).status(200).json({
            message: 'Access token refreshed successfully'
        })
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return next(new Unauthorized('Session expired'))
        }

        if (err instanceof jwt.JsonWebTokenError) {
            next(new Unauthorized('Unauthorized'))
            return
        }

        next(err)
    }
}
