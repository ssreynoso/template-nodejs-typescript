import { Request, Response, NextFunction } from 'express'

import { cookieOptions } from '../lib/cookie-options'
import { generateUserAccessToken, generateUserRefreshToken } from '../services/generate-user-tokens'

import { UsersRepository } from '@/modules/users/repository'
import { loginUserSchema } from '@/modules/users/schemas/login-user.schema'

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body

    try {
        const userData = loginUserSchema.parse(body)
        const user = await UsersRepository.login(userData)

        const accessToken = generateUserAccessToken({ id: user.id, username: user.username })
        const refreshToken = generateUserRefreshToken({ id: user.id, username: user.username })

        res.cookie('access_token', accessToken, cookieOptions)
            .cookie('refresh_token', refreshToken, cookieOptions)
            .status(200)
            .json(user)
    } catch (error) {
        next(error)
    }
}
