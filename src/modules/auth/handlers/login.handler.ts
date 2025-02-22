import { Request, Response, NextFunction } from 'express'

import { UsersRepository } from '@/modules/users/repository'
import { loginUserSchema } from '@/modules/users/schemas/login-user.schema'

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body

    try {
        const userData = loginUserSchema.parse(body)

        const user = await UsersRepository.login(userData)

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
