const { greet } = require('./index.js')

describe('greet', () => {
  describe('with no arguments', () => {
    it('gives a generic greeting', () => {
      const salutation = greet()
      expect(salutation).toEqual('Greetings!')
    })
  })

  describe('with AM as an argument', () => {
    it('gives an appropriate greeting', () => {
      const salutation = greet('AM')
      expect(salutation).toMatch(/morning/i)
    })
  })
})
