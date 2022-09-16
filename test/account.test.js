const config = require('config')
const Clearout = require('../src/')

describe('Clearout Account Related', () => {
  test('Get Available Credits', () => {
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.getCredits()
      .then(data => {
        // console.log(data);
        expect(data).toHaveProperty('credits.total')
      })
  })
})
