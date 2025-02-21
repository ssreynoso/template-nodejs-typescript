import express from 'express'

import { registerHandler } from '../handlers/register.handler'

const router = express.Router()

router.post('/register', registerHandler)

export default router
