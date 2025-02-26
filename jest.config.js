import fs from 'fs'

import { pathsToModuleNameMapper } from 'ts-jest'

const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'))

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}]
    },
    moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/src/__tests__/test-app-server.ts', '/src/__tests__/test-log.ts']
}
