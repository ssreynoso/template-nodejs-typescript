import express from 'express'

import { getUserHandler } from '../handlers/get-user.handler'

const router = express.Router()

router.get('/', getUserHandler)

export default router
