import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
    APP_PORT: process.env.PORT || '8080'
}
