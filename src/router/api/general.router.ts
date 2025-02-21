import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).json({ server_state: true })
})

export default router
