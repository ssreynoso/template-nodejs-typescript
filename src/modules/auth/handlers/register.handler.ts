import { Request, Response, NextFunction } from 'express'

import { AuthRepository } from '../repository'

import { createUserSchema } from '@/modules/users/schemas/create-user.schema'

export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body

    try {
        const userData = createUserSchema.parse(body)

        const newUser = await AuthRepository.createUser(userData)

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}
