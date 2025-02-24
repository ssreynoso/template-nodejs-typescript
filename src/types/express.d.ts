declare module 'express' {
    interface Request {
        session?: {
            user: SessionJWT | null
        }
    }
}

export interface SessionJWT {
    id: string
    username: string
    iat: number
    exp: number
}
