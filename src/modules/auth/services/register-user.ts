import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '@/config'
import { BadRequest } from '@/errors'
import prismadb from '@/lib/prismadb'
import { CreateUserInput } from '@/modules/users/schemas/create-user.schema'

export const registerUser = async (input: CreateUserInput) => {
    const { username, email, password } = input

    const user = await prismadb.user.findFirst({
        where: {
            OR: [{ username: input.username }, { email: input.email }]
        }
    })

    if (user) {
        throw new BadRequest('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = await prismadb.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    return newUser
}
