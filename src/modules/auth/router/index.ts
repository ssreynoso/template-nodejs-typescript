import express from 'express'

import { loginHandler } from '../handlers/login.handler'
import { logoutHandler } from '../handlers/logout.handler'
import { registerHandler } from '../handlers/register.handler'

const router = express.Router()

router.post('/register', registerHandler)

router.post('/login', loginHandler)

router.post('/logout', logoutHandler)

export default router
