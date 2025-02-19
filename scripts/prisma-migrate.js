/* eslint-disable no-undef */
import { execSync } from 'child_process'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Nombre de la migración: ', name => {
    if (!name.trim()) {
        console.log('Error: Debes ingresar un nombre para la migración.')
        rl.close()
        process.exit(1)
    }

    console.log(`Ejecutando: npx prisma migrate dev --name ${name}`)
    execSync(`npx prisma migrate dev --name ${name}`, { stdio: 'inherit' })

    rl.close()
})
