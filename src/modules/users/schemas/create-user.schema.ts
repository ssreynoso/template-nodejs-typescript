import z from 'zod'

export const createUserSchema = z.object({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255)
})

export type CreateUserInput = z.infer<typeof createUserSchema>
