import { LoginUserInput } from '../schemas/login-user.schema'
import { loginUser } from '../services/login-user'
import { registerUser } from '../services/register-user'

import { CreateUserInput } from '@/modules/users/schemas/create-user.schema'
import { processUser } from '@/modules/users/services/process-user'
import { User } from '@/modules/users/types'

export class AuthRepository {
    static async createUser(input: CreateUserInput): Promise<User> {
        const newUser = await registerUser(input)
        const processedUser = processUser(newUser)

        return processedUser
    }

    static async login(input: LoginUserInput): Promise<User> {
        const loggedUser = await loginUser(input)
        const processedUser = processUser(loggedUser)

        return processedUser
    }
}
