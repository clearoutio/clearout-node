const FormData = require('form-data')
const fs = require('fs')

const helpers = require('./helpers')

class EmailVerify {
  constructor(client) {
    this._client = client
  }

  // Instant Verify
  async verifyEmail(params) {
    try {
      const result = await this._client.getClient().then(client =>
        client.verifyEmail(null, { email: params.email, timeout: params.timeout }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Verify
  async verifyBulkEmails(params) {
    try {
      let formData = new FormData();
      formData.append('file', fs.createReadStream(params.file));
      formData.append('optimize', params.optimize);
      formData.append('ignore_duplicate_file', params.ignore_duplicate_file);
      const result = await this._client.getClient().then(client => client.verifyBulkEmails(null,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Verify Progress Status
  async verifyBulkEmailsProgressStatus(params) {
    try {
      const result = await this._client.getClient().then(client => client.verifyBulkEmailsProgressStatus({ list_id: params.list_id }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Verify Result Download
  async downloadResultBulkEmails(params) {
    try {
      const result = await this._client.getClient().then(client => client.downloadResultBulkEmails(null, { list_id: params.list_id }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Verify Result Removal
  async removeBulkEmailsResult(params) {
    try {
      const result = await this._client.getClient().then(client => client.removeBulkEmailsResult(null, { list_id: params.list_id, ignore_result: params.ignore_result }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Catch-All Verify
  async verifyCatchAllEmails(params) {
    try {
      const result = await this._client.getClient().then(client => client.verifyCatchAllEmails(null, { email: params.email, timeout: params.timeout }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Disposable Verify
  async verifyDisposableEmails(params) {
    try {
      const result = await this._client.getClient().then(client => client.verifyDisposableEmails(null, { email: params.email, timeout: params.timeout }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Business Account Verify
  async verifyBusinessEmails(params) {
    try {
      const result = await this._client.getClient().then(client => client.verifyBusinessEmails(null, { email: params.email, timeout: params.timeout }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Free Account Verify
  async verifyFreeEmail(params) {
    try {
      const result = await this._client.getClient().then(client => client.verifyFreeEmail(null, { email: params.email, timeout: params.timeout }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Role Account Verify
  async verifyRoleEmail(params) {
    try {
      const result = await this._client.getClient().then(client => client.verifyRoleEmail(null, { email: params.email, timeout: params.timeout }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Gibberish Account Verify
  async verifyGibberishEmail(params) {
    try {
      const result = await this._client.getClient().then(client => client.verifyGibberishEmail(null, { email: params.email, timeout: params.timeout }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }
}

module.exports = EmailVerify
