import { describe, test, expect } from '@jest/globals'

import { sum } from '.'

describe('Sum function', () => {
    test('Returns correct value', () => {
        expect(sum(2, 3)).toEqual(5)
    })
})
