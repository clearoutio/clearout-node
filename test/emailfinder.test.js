const config = require('config')
const randomString = require('random-string')
const Clearout = require('../src/')

describe('Clearout Email Finder Tests', () => {
  const DATA_FILEPATH = __dirname + '/data/'
  jest.setTimeout(60000);

  test('Instant email finder - for found email', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);

    return clearout.emailFinder.find({
      name: 'Elon Musk',
      domain: 'Tesla.com',
      timeout: 10000,
      queue: true
    })
      .then(result => {
        // console.log(result)
        expect(result.emails[0].email_address).toBe('elon.musk@tesla.com')
      })
  })

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

  test('Bulk email finder - csv file upload', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    // jest.setTimeout(10000)
    return clearout.emailFinder.bulkFind({
      file: DATA_FILEPATH + 'ef_sample_list.csv',
      ignore_duplicate_file: 'true'
    })
      .then(data => {
        // console.log(data)
        expect(data).toHaveProperty('list_id')
      })
  })

  test('Bulk email finder - progress status of uploaded file', () => {
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailFinder.bulkFind({
      file: DATA_FILEPATH + 'ef_single_person.csv',
      ignore_duplicate_file: 'true'
    })
      .then(data => {
        expect(data).toHaveProperty('list_id')
        let params = { list_id: data.list_id }
        return params
      })
      .then(async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return await clearout.emailFinder.getBulkFindProgressStatus(params)
      })
      .then(data => {
        // console.log(data);
        return expect(data).toHaveProperty('progress_status')
      })
  })

  test('Bulk email finder - result download', () => {
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailFinder.bulkFind({
      file: DATA_FILEPATH + 'ef_single_person.csv',
      ignore_duplicate_file: 'true'
    })
      .then(data => {
        expect(data).toHaveProperty('list_id')
        let params = { list_id: data.list_id }
        return params
      })
      .then(async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return await clearout.emailFinder.downloadBulkFindResult(params)
      })
      .then(data => {
        // console.log(data);
        return expect(data).toHaveProperty('url')
      })
  })

  test('Bulk email finder - list removal with ignore result as true', () => {
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailFinder.bulkFind({
      file: DATA_FILEPATH + 'ef_single_person.csv',
      ignore_duplicate_file: 'true'
    })
      .then(data => {
        expect(data).toHaveProperty('list_id')
        let params = { list_id: data.list_id, ignore_result: true }
        return params
      })
      .then(async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return await clearout.emailFinder.removeBulkFindList(params)
      })
      .then(data => {
        // console.log(data);
        return expect(data).toHaveProperty('name')
      })
  })

})
