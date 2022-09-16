const _ = require('lodash')
const FormData = require('form-data')

const ClearoutOpenApiClient = require('../libs/clearout-openapi-impl').OpenApiClient
const EmailVerifier = require('./email_verifier')
const EmailFinder = require('./email_finder')

function Clearout(token, config) {
  if (!(this instanceof Clearout)) {
    let _clearout = new Clearout(token, config);
    _clearout._setDefaultConfig(token, config)
    return _clearout
  }

  // instance vars 
  this.emailFinder = null
  this.emailVerifier = null

  /** @private */
  this._defaultConfig = {}

  // initialize
  this._setDefaultConfig(token, config)
}

Clearout.prototype = {
  // Get Available Credits
  async getCredits() {
    return await this.clearoutOpenApiClient.getCredits()
  },

  /**
   * @private
   */
  _setDefaultConfig(token, config) {
    this._defaultConfig = {
      token
    }
    this.clearoutOpenApiClient = new ClearoutOpenApiClient({ api_token: token })

    // initialize service level default Config 
    this.emailVerifier = new EmailVerifier(config, this.clearoutOpenApiClient)
    this.emailFinder = new EmailFinder(config, this.clearoutOpenApiClient)
  }
}

module.exports = Clearout
module.exports.default = Clearout