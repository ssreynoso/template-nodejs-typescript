export const validateUser = (user: unknown, expectedUser: { username: string; email: string }) => {
    expect(user).toMatchObject({
        username: expectedUser.username,
        email: expectedUser.email
    })
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('createdAt')
}
