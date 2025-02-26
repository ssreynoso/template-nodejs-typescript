import { describe, test, expect } from '@jest/globals'
import supertest from 'supertest'

import app from '../test-app-server'

const request = supertest(app)

describe('General', () => {
    test('GET to /api/v1 responses with server_state: true', async () => {
        const response = await request.get('/api/v1').expect('Content-Type', /json/).expect(200)

        expect(response.body).toEqual({ server_state: true })
    })
})
