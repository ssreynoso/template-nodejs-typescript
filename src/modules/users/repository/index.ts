import { CreateUserInput } from '../schemas/create-user.schema'

import { BadRequest } from '@/errors'
import prismadb from '@/lib/prismadb'

export class UsersRepository {
    static async create(input: CreateUserInput) {
        const { username, email, password } = input

        const user = await prismadb.user.findFirst({
            where: {
                OR: [{ username: input.username }, { email: input.email }]
            }
        })

        if (user) {
            throw new BadRequest('User already exists')
        }

        const newUser = await prismadb.user.create({
            data: {
                username,
                email,
                password
            }
        })

        return newUser
    }
}
