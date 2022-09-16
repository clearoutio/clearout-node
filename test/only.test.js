const config = require('config')
const randomString = require('random-string')
const Clearout = require('../src/')

describe('Only test', () => {
  const DATA_FILEPATH = __dirname + '/data/'
  jest.setTimeout(60000);

  test('Instant email finder - queue status of email', () => {
    const clearout = new Clearout(config.api_token, config.config);
    let name = 'Elon ' + randomString({
      length: 8,
      numeric: false,
      letters: true,
      special: false,
      exclude: []
    })
    return clearout.emailFinder.find({
      name,
      domain: 'tesla.com',
      timeout: 10000,
      queue: true
    })
      .catch(error => {
        expect(error).toHaveProperty('additional_info.queue_id')
        return error.additional_info.queue_id
      })
      .then(async (qid) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return await clearout.emailFinder.getStatus({ qid })
      })
      .then(result => {
        return expect(result).toHaveProperty('query_status')
      })
    //.catch(e => console.error(e))
  })

}) // describe ends
