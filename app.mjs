import Clearout from '@clearoutio/clearout';

(async () => {
  try {
    const clearout = new Clearout('REPLACE_WITH_YOUR_SERVER_APP_API_TOKEN', { timeout: 5000 });
    const result = await clearout.emailVerifier.verify({ email: 'elon.musk@tesla.com' });
    console.log(`Email ${result.email_address} status is ${result.status}, Is it safe to send? ${result.safe_to_send}`);
  } catch (error) {
    console.error(error)
  }
})();