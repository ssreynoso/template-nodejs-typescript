import { User as TUser } from '@prisma/client'

export type PrismaUser = TUser
export interface User {
    id: PrismaUser['id']
    username: PrismaUser['username']
    email: PrismaUser['email']
    createdAt: PrismaUser['createdAt']
}

export interface GetUserInput {
    id: User['id']
}
