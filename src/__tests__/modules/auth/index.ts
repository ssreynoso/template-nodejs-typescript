import { describe, test, expect } from '@jest/globals'
import supertest from 'supertest'

import app from '@/__tests__/test-server'

const request = supertest(app)

describe('Auth Module', () => {
    describe('Register User', () => {
        test('Returns correct value', async () => {
            const response = await request.post('/api/v1/auth/register').send({
                username: 'sreynoso',
                email: 's.reynosodunjo@gmail.com',
                password: '12345678'
            })

            console.log(response.body)

            // Debería evaluar body

            // expect(response.body).toEqual({ message: 'Register User' })
        })
    })

    test('Returns correct value', async () => {
        const response = await request.get('/api/v1').expect('Content-Type', /json/).expect(200)

        expect(response.body).toEqual({ server_state: true })
    })
})
