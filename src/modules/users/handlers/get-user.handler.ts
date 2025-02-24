import { Request, Response, NextFunction } from 'express'

import { UsersRepository } from '../repository'

export const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.session

        const id = data!.user!.id
        const user = await UsersRepository.get({ id })

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
