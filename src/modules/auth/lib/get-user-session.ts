import { Request } from 'express'

import { SessionJWT } from '@/types/express'

export const getSessionData = (req: Request): SessionJWT => {
    return req.session as unknown as SessionJWT
}
