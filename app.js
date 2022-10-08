const clearout = require('./src')('REPLACE_WITH_YOUR_SERVER_APP_API_TOKEN', { timeout: 5000 })
try {
  clearout.emailVerifier.verify({ email: 'elon.musk@tesla.com' })
    .then(result => console.log(`Email ${result.email_address} status is ${result.status}, Is it safe to send? ${result.safe_to_send}`))
    .catch(error => console.error(error));
}
catch (error) {
  console.error(error)
}