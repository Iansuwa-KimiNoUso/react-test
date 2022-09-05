import ExpiryToMilliseconds from 'app/auth/ExpiryToMilliseconds'

describe('ExpiryToMilliseconds Unit Test', () => {
    it('Should return the an expiry time', () => {
        expect(ExpiryToMilliseconds(date)).toBeGreaterThanOrEqual(1)
    })
    var date = new Date()
    date.setSeconds(date.getSeconds() + 10)
})
