import { validateUser } from '../utils'

import { BadRequest } from '@/errors'
import { AuthRepository } from '@/modules/auth/repository'

const user = {
    username: 'sreynoso',
    email: 'test@mail.com',
    password: '12345678'
}

describe('Auth Module', () => {
    test('A user is created correctly', async () => {
        const createdUser = await AuthRepository.createUser(user)
        validateUser(createdUser, user)
    })

    test('Try to create a user but it is duplicated', async () => {
        await expect(AuthRepository.createUser(user)).rejects.toThrow(BadRequest)
    })

    test('Login with email is correct', async () => {
        const loggedUser = await AuthRepository.login({
            email: user.email,
            password: user.password
        })
        validateUser(loggedUser, user)
    })

    test('Login with username is correct', async () => {
        const loggedUser = await AuthRepository.login({
            username: user.username,
            password: user.password
        })
        validateUser(loggedUser, user)
    })
})
