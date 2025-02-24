import { NextFunction, Request, Response } from 'express'

import { BadRequest } from '@/errors'

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token

    if (!token) {
        next(new BadRequest('No session found'))
        return
    }

    res.clearCookie('access_token').json({
        message: 'Logout successful'
    })
}
