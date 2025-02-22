import z from 'zod'

export const loginUserSchema = z
    .object({
        username: z.string().min(3).max(255).optional(),
        email: z.string().email().optional(),
        password: z.string().min(8).max(255)
    })
    .refine(data => data.username || data.email, {
        message: 'Either username or email is required',
        path: ['username', 'email']
    })

export type LoginUserInput = z.infer<typeof loginUserSchema>
