import { Request, Response } from 'express'

const notFoundMiddleware = (req: Request, res: Response) => {
    console.warn(`Route not found: [${req.method}] ${req.originalUrl}`)

    res.status(404).json({
        error: 'Not Found'
    })
}

export default notFoundMiddleware
