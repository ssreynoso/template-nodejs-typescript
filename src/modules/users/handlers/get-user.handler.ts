import { Request, Response, NextFunction } from 'express'

import { UsersRepository } from '../repository'

import { getSessionData } from '@/modules/auth/lib/get-user-session'

export const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = getSessionData(req)
        const user = await UsersRepository.get({ id })

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
