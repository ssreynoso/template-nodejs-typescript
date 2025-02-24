import { GetUserInput } from '../types'

import prismadb from '@/lib/prismadb'

export const getUser = async (input: GetUserInput) => {
    const user = await prismadb.user.findFirst({
        where: {
            id: input.id
        }
    })

    return user
}
