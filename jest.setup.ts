import prismadb from './src/lib/prismadb'

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(message => {
        const testPath = expect.getState().testPath || 'Unknown Test File'
        const fileName = testPath.split('/').pop() // Obtiene solo el nombre del archivo
        process.stdout.write(`[${fileName}] ${message}\n`)
    })

    jest.spyOn(console, 'error').mockImplementation(message => {
        process.stderr.write(message + '\n')
    })

    jest.spyOn(console, 'warn').mockImplementation(message => {
        process.stderr.write('⚠️ ' + message + '\n') // Agrega un emoji de advertencia
    })
})

afterAll(() => {
    prismadb.$disconnect()
})
