import bcrypt from 'bcrypt'

import { LoginUserInput } from '../schemas/login-user.schema'

import { BadRequest } from '@/errors'
import prismadb from '@/lib/prismadb'
import { PrismaUser } from '@/modules/users/types'

export const loginUser = async (input: LoginUserInput): Promise<PrismaUser> => {
    const { username, email, password } = input

    const user = await prismadb.user.findFirst({
        where: {
            OR: [{ username }, { email }]
        }
    })

    if (!user) {
        throw new BadRequest('Invalid credentials')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new BadRequest('Invalid credentials')
    }

    return user
}
