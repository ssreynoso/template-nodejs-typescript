import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

import { BadRequest, Unauthorized } from '@/errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlerMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    // Log error
    console.error(err instanceof Error ? err.stack : err)

    if (err instanceof BadRequest) {
        res.status(400).json({
            error: err.message
        })
        return
    }

    if (err instanceof Unauthorized) {
        res.status(401).json({
            error: err.message
        })
        return
    }

    if (err instanceof ZodError) {
        res.status(400).json({
            error: err.errors
        })
        return
    }

    res.status(500).json({
        error: 'Internal Server Error'
    })
}

export default errorHandlerMiddleware
