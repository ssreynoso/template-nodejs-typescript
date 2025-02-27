import { describe, test } from '@jest/globals'
import supertest from 'supertest'

import { validateUser } from '../utils'

import app from '@/__tests__/test-app-server'

const request = supertest(app)

const mockedUser = {
    username: 'user',
    email: 'user@mocked.com',
    password: '12345678'
}

describe('Auth Module', () => {
    describe('Register User', () => {
        test('Register user creates a user and responses with the data', async () => {
            const response = await request
                .post('/api/v1/auth/register')
                .send(mockedUser)
                .expect('Content-Type', /json/)
                .expect(201)

            validateUser(response.body, mockedUser)
        })

        test('Register user with duplicated email throws bad request', async () => {
            await request.post('/api/v1/auth/register').send(mockedUser).expect('Content-Type', /json/).expect(400)
        })

        test('Login with email is correct', async () => {
            const response = await request
                .post('/api/v1/auth/login')
                .send({
                    email: mockedUser.email,
                    password: mockedUser.password
                })
                .expect('Content-Type', /json/)
                .expect(200)

            validateUser(response.body, mockedUser)
        })

        test('Login with username is correct', async () => {
            const response = await request
                .post('/api/v1/auth/login')
                .send({
                    username: mockedUser.username,
                    password: mockedUser.password
                })
                .expect('Content-Type', /json/)
                .expect(200)

            validateUser(response.body, mockedUser)
        })

        test('Login with invalid credentials throws bad request', async () => {
            await request
                .post('/api/v1/auth/login')
                .send({
                    email: 'invalid',
                    password: 'invalid'
                })
                .expect('Content-Type', /json/)
                .expect(400)
        })
    })
})
