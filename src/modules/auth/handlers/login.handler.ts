import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@/config'
import { UsersRepository } from '@/modules/users/repository'
import { loginUserSchema } from '@/modules/users/schemas/login-user.schema'

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body

    try {
        const userData = loginUserSchema.parse(body)
        const user = await UsersRepository.login(userData)

        const accessToken = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            JWT_SECRET!,
            { expiresIn: '1h' }
        )

        res.cookie('access_token', accessToken, {
            httpOnly: true, // La cookie no puede ser accedida por el cliente
            secure: process.env.NODE_ENV === 'production', // La cookie solo se puede acceder por HTTPS
            sameSite: 'strict' // La cookie no se puede enviar en peticiones de terceros
        })
            .status(200)
            .json(user)
    } catch (error) {
        next(error)
    }
}

/**
 * ¿Puedo pasar la firma del token a otra función?
 * ¿Se usaría en otro lado esa firma?
 * El res.cookie() es un método de express, ¿se puede usar en otro lado?
 *
 * ¿Existe la posibilidad que un middleware alimente las respuestas de los controladores?
 * ¿Puedo hacer un middleware que se encargue de manejar las rutas protegidas?
 *  - Debería controlar el access_token y si esta todo bien, usar next() para pasar al controlador
 *
 * **/
