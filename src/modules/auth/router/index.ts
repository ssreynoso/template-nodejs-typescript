import express from 'express'

import { loginHandler } from '../handlers/login.handler'
import { registerHandler } from '../handlers/register.handler'

const router = express.Router()

router.post('/register', registerHandler)

router.post('/login', loginHandler)

export default router
