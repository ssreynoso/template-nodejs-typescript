import { getUser } from '../services/get-user'
import { processUser } from '../services/process-user'
import { GetUserInput, User } from '../types'

import { NotFound } from '@/errors/not-found'

export class UsersRepository {
    static async get(input: GetUserInput): Promise<User> {
        const user = await getUser(input)

        if (!user) {
            throw new NotFound('User not found')
        }

        const processedUser = processUser(user)

        return processedUser
    }
}
