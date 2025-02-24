import { PrismaUser, User } from '../types'

export const processUser = (unprocessedUser: PrismaUser): User => {
    const processedUser = {
        id: unprocessedUser.id,
        username: unprocessedUser.username,
        email: unprocessedUser.email,
        createdAt: unprocessedUser.createdAt
    }

    return processedUser
}
