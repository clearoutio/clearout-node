const _ = require('lodash')

const Constants = require('./constants')

function EmailVerifier(config, clearoutOpenApiClient) {
  /** @private */
  this._defaultConfig = {}
  this._setDefaultConfig(config)
  this._clearoutOpenApiClient = clearoutOpenApiClient
}

EmailVerifier.prototype = {
  // Instant Verify
  async verify({ email, timeout }) {
    if (!_.isNumber(timeout)) { timeout = this._defaultConfig.timeout }
    return await this._clearoutOpenApiClient.emailVerify.verifyEmail({ email, timeout })
  },

  // Bulk Verify
  async bulkVerify({ file, optimize, ignore_duplicate_file }) {
    if (_.isEmpty(optimize)) { optimize = this._defaultConfig.optimize }
    if (_.isEmpty(ignore_duplicate_file)) { ignore_duplicate_file = this._defaultConfig.ignore_duplicate_file }
    return await this._clearoutOpenApiClient.emailVerify.verifyBulkEmails({ file, optimize, ignore_duplicate_file })
  },

  // Bulk Verify Progress Status
  async getBulkVerifyProgressStatus({ list_id }) {
    return await this._clearoutOpenApiClient.emailVerify.verifyBulkEmailsProgressStatus({ list_id })
  },

  // Bulk Verify Result Download
  async downloadBulkVerifyResult({ list_id }) {
    return await this._clearoutOpenApiClient.emailVerify.downloadResultBulkEmails({ list_id })
  },

  // Bulk Verify Removal
  async removeBulkVerifyList({ list_id, ignore_result }) {
    if (!_.isBoolean(ignore_result)) { ignore_result = this._defaultConfig.ignore_result }
    return await this._clearoutOpenApiClient.emailVerify.removeBulkEmailsResult({ list_id, ignore_result })
  },

  // Catch-All Verify
  async isCatchAllEmail({ email, timeout }) {
    if (_.isEmpty(timeout)) { timeout = this._defaultConfig.timeout }
    return await this._clearoutOpenApiClient.emailVerify.verifyCatchAllEmails({ email, timeout })
  },

  // Disposable Verify
  async isDisposableEmail({ email, timeout }) {
    if (_.isEmpty(timeout)) { timeout = this._defaultConfig.timeout }
    return await this._clearoutOpenApiClient.emailVerify.verifyDisposableEmails({ email, timeout })
  },

  // Business Account Verify
  async isBusinessEmail({ email, timeout }) {
    if (_.isEmpty(timeout)) { timeout = this._defaultConfig.timeout }
    return await this._clearoutOpenApiClient.emailVerify.verifyBusinessEmails({ email, timeout })
  },

  // Free Account Verify
  async isFreeEmail({ email, timeout }) {
    if (_.isEmpty(timeout)) { timeout = this._defaultConfig.timeout }
    return await this._clearoutOpenApiClient.emailVerify.verifyFreeEmail({ email, timeout })
  },

  // Role Account Verify
  async isRoleEmail({ email, timeout }) {
    if (_.isEmpty(timeout)) { timeout = this._defaultConfig.timeout }
    return await this._clearoutOpenApiClient.emailVerify.verifyRoleEmail({ email, timeout })
  },

  // Gibberish Account Verify
  async isGibberishEmail({ email, timeout }) {
    if (_.isEmpty(timeout)) { timeout = this._defaultConfig.timeout }
    return await this._clearoutOpenApiClient.emailVerify.verifyGibberishEmail({ email, timeout })
  },

  /**
 * @private
 */
  async _setDefaultConfig(config) {
    let _timeout = _.get(config, 'timeout')
    this._defaultConfig = {
      timeout: _.isNumber(_timeout) ? _timeout : Constants.EMAIL_VERIFY.DEFAULT_TIMEOUT,
      optimize: _.get(config, 'optimize', Constants.EMAIL_VERIFY.DEFAULT_OPTIMIZE),
      ignore_result: _.get(config, 'ignore_result', Constants.EMAIL_VERIFY.DEFAULT_IGNORE_RESULT),
      ignore_duplicate_file: _.get(config, 'ignore_duplicate_file', Constants.EMAIL_VERIFY.DEFAULT_IGNORE_DUPLICATE_FILE)
    }
  },
}

module.exports = EmailVerifier
