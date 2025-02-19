/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()

// Si estamos en desarrollo, hacemos que prisma sea global.
// Porque en desarrollo, el hot reload de next.js hace que se reinicie el servidor
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb
