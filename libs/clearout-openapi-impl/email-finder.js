const FormData = require('form-data')
const fs = require('fs')

const helpers = require('./helpers')

class EmailFinder {
  constructor(client) {
    this._client = client
  }

  // Instant Email Finder
  async findEmail(params) {
    try {
      const result = await this._client.getClient().then(client =>
        client.findEmail(null, { name: params.name, domain: params.domain, timeout: params.timeout, queue: params.queue }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Instant Email Finder Status
  async findEmailStatus(params) {
    try {
      const result = await this._client.getClient().then(client => client.findEmailStatus({ qid: params.qid }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Email Finder
  async findBulkEmails(params) {
    try {
      let formData = new FormData();
      formData.append('file', fs.createReadStream(params.file));
      formData.append('ignore_duplicate_file', params.ignore_duplicate_file);
      const result = await this._client.getClient().then(client => client.findBulkEmails(null,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Email Finder Progress Status
  async findBulkEmailsProgressStatus(params) {
    try {
      const result = await this._client.getClient().then(client => client.findBulkEmailsProgressStatus({ list_id: params.list_id }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Finder Result Download
  async downloadBulkEmailsResult(params) {
    try {
      const result = await this._client.getClient().then(client => client.downloadBulkEmailsResult(null, { list_id: params.list_id }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Bulk Email Finder Removal
  async removeBulkEmailsList(params) {
    try {
      const result = await this._client.getClient().then(client => client.removeBulkEmailsList(null, { list_id: params.list_id, ignore_result: params.ignore_result }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }

  // Cancel Bulk Finder List
  async cancelBulkFinderList(params) {
    try {
      const result = await this._client.getClient().then(client => client.cancelBulkFinderList(null, { list_id: params.list_id }))
      return helpers.handleResult(result)
    } catch (error) {
      throw helpers.handleError(error)
    }
  }
}

module.exports = EmailFinder
