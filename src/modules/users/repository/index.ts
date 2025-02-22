import { CreateUserInput } from '../schemas/create-user.schema'
import { LoginUserInput } from '../schemas/login-user.schema'
import { loginUser } from '../services/login-user'
import { registerUser } from '../services/register-user'

export class UsersRepository {
    static async create(input: CreateUserInput) {
        const newUser = await registerUser(input)

        return newUser
    }

    static async login(input: LoginUserInput) {
        const loggedUser = await loginUser(input)

        return loggedUser
    }
}
