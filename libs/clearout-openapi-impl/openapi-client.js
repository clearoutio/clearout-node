const OpenAPIClientAxios = require('openapi-client-axios').default

const EmailVerify = require('./email-verify')
const EmailFinder = require('./email-finder')
const helpers = require('./helpers')

class OpenApiClient {
  constructor({ api_token }) {
    this._apiToken = api_token
    this._client = new OpenAPIClientAxios({
      definition: __dirname + '/Clearout-OpenAPI-Spec-V3.yaml',
      axiosConfigDefaults: {
        headers: {
          'Authorization': api_token,
          'Cache-Control': 'no-cache',
          'content-type': 'application/json;charset=UTF-8',
        }
      }
    })
    this.emailVerify = new EmailVerify(this)
    this.emailFinder = new EmailFinder(this)
  }

  // Get Credits
  async getCredits() {
    try {
      const result = await this._client.getClient().then(client => client.getCredits())
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  async getClient() {
    if (!this._clientInitialized) {
      this._client = await this._client.init()
      this._clientInitialized = true
    }
    return this._client
  }
}

module.exports = OpenApiClient
