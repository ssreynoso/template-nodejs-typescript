import jwt from 'jsonwebtoken'

import { JWT_REFRESH_SECRET, JWT_SECRET } from '@/config'
import { User } from '@/modules/users/types'

interface UserToken {
    id: User['id']
    username: User['username']
}

export const generateUserAccessToken = (user: UserToken) => {
    const accessToken = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        JWT_SECRET!,
        { expiresIn: '24h' } // 24 horas
    )

    return accessToken
}

export const generateUserRefreshToken = (user: UserToken) => {
    const refreshToken = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        JWT_REFRESH_SECRET!,
        { expiresIn: '7d' } // 7 días
    )

    return refreshToken
}
