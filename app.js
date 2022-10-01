const clearout = require('./src')('REPLACE_WITH_YOUR_SERVER_APP_API_TOKEN', { timeout: 5000 })
try {
  clearout.emailVerifier.cancelBulkVerifyList({ list_id: "6333df661050373d5efc5f1d" })
    .then(result => {
      return expect(result).toHaveProperty('status')
    })
    .catch(e => console.error(e))
}
catch (error) {
  console.error(error)
}