const _ = require('lodash')

// const clearoutOpenApiImpl = require('./libs/clearout-openapi-impl')
const Constants = require('./constants')

function EmailFinder(config, clearoutOpenApiClient) {
  /** @private */
  this._defaultConfig = {}
  this._setDefaultConfig(config)
  this._clearoutOpenApiClient = clearoutOpenApiClient
}

EmailFinder.prototype = {
  // Instant Email Finder
  async find({ name, domain, timeout, queue }) {
    if (!_.isNumber(timeout)) { timeout = this._defaultConfig.timeout }
    if (_.isEmpty(queue)) { queue = this._defaultConfig.queue }
    return await this._clearoutOpenApiClient.emailFinder.findEmail({ name, domain, timeout, queue })
  },

  // Instant Email Finder Status
  async getStatus({ qid }) {
    return await this._clearoutOpenApiClient.emailFinder.findEmailStatus({ qid })
  },

  // Bulk Email Finder
  async bulkFind({ file, ignore_duplicate_file }) {
    if (_.isEmpty(ignore_duplicate_file)) { ignore_duplicate_file = this._defaultConfig.ignore_duplicate_file }
    return await this._clearoutOpenApiClient.emailFinder.findBulkEmails({ file, ignore_duplicate_file })
  },

  // Bulk Email Finder Progress Status
  async getBulkFindProgressStatus({ list_id }) {
    return await this._clearoutOpenApiClient.emailFinder.findBulkEmailsProgressStatus({ list_id })
  },

  // Bulk Finder Result Download
  async downloadBulkFindResult({ list_id }) {
    return await this._clearoutOpenApiClient.emailFinder.downloadBulkEmailsResult({ list_id })
  },

  // Bulk Email Finder Removal
  async removeBulkFindList({ list_id, ignore_result }) {
    if (!_.isBoolean(ignore_result)) { ignore_result = this._defaultConfig.ignore_result }
    return await this._clearoutOpenApiClient.emailFinder.removeBulkEmailsList({ list_id, ignore_result })
  },

  /**
  * @private
  */
  async _setDefaultConfig(config) {
    let _timeout = _.get(config, 'timeout')
    this._defaultConfig = {
      timeout: _.isNumber(_timeout) ? _timeout : Constants.EMAIL_FINDER.DEFAULT_TIMEOUT,
      queue: _.get(config, 'queue', Constants.EMAIL_FINDER.DEFAULT_QUEUE),
      ignore_result: _.get(config, 'ignore_result', Constants.EMAIL_FINDER.DEFAULT_IGNORE_RESULT),
      ignore_duplicate_file: _.get(config, 'ignore_duplicate_file', Constants.EMAIL_FINDER.DEFAULT_IGNORE_DUPLICATE_FILE)
    }
  },
}

module.exports = EmailFinder