const config = require('config')
const Clearout = require('../src/')

describe('Clearout Email Verifier Tests', () => {
  const DATA_FILEPATH = __dirname + '/data/'
  jest.setTimeout(60000);

  test('Instant email validation - for valid status', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.verify({ email: 'mike@gmail.com' })
      .then(data => {
        //console.log(data)
        expect(data.status).toBe('valid')
      })
  })

  test('Bulk email verification - csv file upload', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    // jest.setTimeout(10000)
    return clearout.emailVerifier.bulkVerify({
      file: DATA_FILEPATH + 'ev_yahoo_emails.csv',
      optimize: 'highest_accuracy',
      ignore_duplicate_file: 'true'
    })
      .then(data => expect(data).toHaveProperty('list_id'))
  })

  test('Bulk email verification - progress status of uploaded file', () => {
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.bulkVerify({
      file: DATA_FILEPATH + 'ev_yahoo_emails.csv',
      optimize: 'highest_accuracy',
      ignore_duplicate_file: 'true'
    })
      .then(data => {
        expect(data).toHaveProperty('list_id')
        let params = { list_id: data.list_id }
        return params
      })
      .then(async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return await clearout.emailVerifier.getBulkVerifyProgressStatus(params)
      })
      .then(data => {
        // console.log(data);
        return expect(data).toHaveProperty('progress_status')
      })
  })

  test('Bulk email verification - result download', () => {
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.bulkVerify({
      file: DATA_FILEPATH + 'ev_single_email.csv',
      optimize: 'highest_accuracy',
      ignore_duplicate_file: 'true'
    })
      .then(data => {
        expect(data).toHaveProperty('list_id')
        let params = { list_id: data.list_id }
        return params
      })
      .then(async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return await clearout.emailVerifier.downloadBulkVerifyResult(params)
      })
      .then(data => {
        // console.log(data);
        return expect(data).toHaveProperty('url')
      })
  })

  test('Bulk email verification - list removal with ignore result as true', () => {
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.bulkVerify({
      file: DATA_FILEPATH + 'ev_single_email.csv',
      optimize: 'highest_accuracy',
      ignore_duplicate_file: 'true'
    })
      .then(data => {
        expect(data).toHaveProperty('list_id')
        let params = { list_id: data.list_id, ignore_result: true }
        return params
      })
      .then(async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return await clearout.emailVerifier.removeBulkVerifyList(params)
      })
      .then(data => {
        // console.log(data);
        return expect(data).toHaveProperty('name')
      })
  })

  test('Catch-All email verify', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.isCatchAllEmail({ email: 'mike.k@shopify.com' })
      .then(data => {
        // console.log(data)
        expect(data.catchall).toBe('yes')
      })
  })

  test('Disposable email verify', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.isDisposableEmail({ email: 'john@temp-mail.org' })
      .then(data => {
        // console.log(data)
        expect(data.disposable).toBe('yes')
      })
  })

  test('Business Account verify', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.isBusinessEmail({ email: 'us@clearout.io' })
      .then(data => {
        // console.log(data)
        expect(data.business_account).toBe('yes')
      })
  })

  test('Free Account verify', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.isFreeEmail({ email: 'john@gmail.com' })
      .then(data => {
        // console.log(data)
        expect(data.free_account).toBe('yes')
      })
  })

  test('Role Account verify', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.isRoleEmail({ email: 'info@gmail.com' })
      .then(data => {
        // console.log(data)
        expect(data.role_account).toBe('yes')
      })
  })

  test('Gibberish Account verify', () => {
    //console.log(config.api_token)
    const clearout = new Clearout(config.api_token, config.config);
    return clearout.emailVerifier.isGibberishEmail({ email: 'abcd12345@gmail.com' })
      .then(data => {
        // console.log(data)
        expect(data.gibberish).toBe('yes')
      })
  })

}) // describe
