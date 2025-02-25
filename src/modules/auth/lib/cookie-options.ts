import { CookieOptions } from 'express'

export const cookieOptions: CookieOptions = {
    httpOnly: true, // La cookie no puede ser accedida por el cliente
    secure: process.env.NODE_ENV === 'production', // La cookie solo se puede acceder por HTTPS
    sameSite: 'strict' // La cookie no se puede enviar en peticiones de terceros
}
