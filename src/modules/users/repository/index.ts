import { CreateUserInput } from '../schemas/create-user.schema'
import { LoginUserInput } from '../schemas/login-user.schema'
import { getUser } from '../services/get-user'
import { loginUser } from '../services/login-user'
import { processUser } from '../services/process-user'
import { registerUser } from '../services/register-user'
import { GetUserInput, User } from '../types'

import { NotFound } from '@/errors/not-found'

export class UsersRepository {
    static async create(input: CreateUserInput): Promise<User> {
        const newUser = await registerUser(input)
        const processedUser = processUser(newUser)

        return processedUser
    }

    static async login(input: LoginUserInput): Promise<User> {
        const loggedUser = await loginUser(input)
        const processedUser = processUser(loggedUser)

        return processedUser
    }

    static async get(input: GetUserInput): Promise<User> {
        const user = await getUser(input)

        if (!user) {
            throw new NotFound('User not found')
        }

        const processedUser = processUser(user)

        return processedUser
    }
}
