process.loadEnvFile()

export const { APP_PORT = '8080', SALT_ROUNDS = 10, JWT_SECRET } = process.env
