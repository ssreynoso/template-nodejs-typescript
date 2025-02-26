describe('Unit Test', () => {
    beforeAll(() => {
        console.log('Before All')
    })

    beforeEach(() => {
        console.log(`Setup for: ${expect.getState().currentTestName}`)
    })

    afterEach(() => {
        console.log(`Teardown for: ${expect.getState().currentTestName}`)
    })

    afterAll(() => {
        console.log('After All')
    })

    // ------------------------------------

    test('Sum 1 + 1', () => {
        expect(1 + 1).toBe(2)
    })

    test('Sum 2 + 2', () => {
        expect(2 + 2).toBe(4)
    })
})
