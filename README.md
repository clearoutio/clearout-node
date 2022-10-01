# Clearout - An Official Email Verification and Email Finding Node.js Library

The Clearout node library is a wrapper of the [Clearout REST API](https://docs.clearout.io/api-overview.html) and allows developers to write applications in server-side JavaScript to perform real-time, bulk email verification and discovery. This programmatic interface will allow you to easily integrate into your use cases such as

 - Avoid capturing bad email addresses in your forms, chats, or anywhere else where email is accepted.  
 - Bulk email verification to remove invalid, dead and fake emails from your email lists
 - Email finder to build pre-verified & accurate B2B leads for cold outreach

Clearout infrastructure has been designed to retain **high throughput, security and precision accuracy.** Bulk email verification or email finder support lists of any size, as long as credits are available in account

## Documentation
See the [`Clearout API docs`](https://docs.clearout.io/api-overview.html) to know RESTFul endpoints 

## Requirements

Node >= 10 or higher.

## Installation

Install the package with:

```bash
npm install @clearoutio/clearout --save
```

## Usage
The package needs to be initialized with your Clearout's server app API token, which is available in the [`Clearout Apps Dashboard`](https://app.clearout.io/dashboard/apps). If you don't find server app, please create one and copy the API token 

**Using as commonJS module with `Promise`:**
<!-- prettier-ignore -->
```js 
const clearout = require('@clearoutio/clearout')('replace-with-your-api-token', { timeout: 5000 })

try {
  clearout.emailVerifier.verify({ email: 'elon.musk@tesla.com' })
    .then(result => console.log(`Email ${result.email_address} status is ${result.status}, Is it safe to send? ${result.safe_to_send}`))
    .catch(error => console.error(error));
}
catch (error) {
  console.error(error)
}

```

**Or using as ES modules with `async`/`await`:**

```js
import Clearout from '@clearoutio/clearout';

(async () => {
  try {
    const clearout = new Clearout('replace-with-your-api-token', { timeout: 5000 });
    const result = await clearout.emailVerifier.verify({ email: 'elon.musk@tesla.com' });
    console.log(`Email ${result.email_address} status is ${result.status}, Is it safe to send? ${result.safe_to_send}`);
  } catch (error) {
    console.error(error)
  }
})();
```

### Configuration

Initialize with config object

All service level settings for the Clearout package can be initialized, but they can be overridden when invoking the specific service methods.


```js
import Clearout from '@clearoutio/clearout';
const clearout = new Clearout("replace-with-your-api-token", {timeout: 5000, ignore_result: true, ignore_duplicate_file: 'true'});
```

| Option  | Default | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`        | `null`             | Clearout server app [API token](https://app.clearout.io/dashboard/apps)                                                                                                                                                             |
| `timeout` | 130,000 ms (Email Verifier) <br/> 30,000 ms (Email Finder)                  | Maximum time each request can take in milliseconds                                                                                                                                                                             |
| `ignore_result`         | `false`             | Ignore the result file, even if it's not downloaded. Used when invoking list removal      |
| `ignore_duplicate_file`         | `'false'`             | Whether to allow duplicate file upload based on file name and size.    |


### Error Handling
All service methods return promise and throw an exception in case if the response status is failed, hence  the recommended approach would be to call service method within a `try...catch` block

```js
const clearout = require('@clearoutio/clearout')('replace-with-your-api-token', {timeout: 30000})

async function findEmail(name, domain) {
  try {
    console.log('Finding email, please wait...')
    const result = await clearout.emailFinder.find({ name, domain});
    console.log(`Email found ${result.emails[0].email_address} with confidence score ${result.confidence_score}`);
  } catch (error) {
    console.error('Errored:', error.message)
  }
}

findEmail('elon musk', 'tesla.com')
```

### Email Verification Service 
`clearout.emailVerifier` is a ready-to-use object that contains the methods for verifying email addresses in real-time and verifying millions of email addresses from a file 


| Method | Parameters | Return |Description                                                                                                                                                                                                                                       |
| ------- | --------- | ----------- | -- |
| `verify({email[, timeout]})` | `email:String` - Email address to verify <br/><br/>  `timeout:Number` - Overridable optional param with default value 130000 ms              | Object with verified result  | Instant email verification method to return the current status of email address                                                                                         |
| `bulkVerify({file[, optimize, ignore_duplicate_file]})` | `file:String` - Absolute file path containing email addresses to be uploaded<br/><br/>  `optimize:String` - Can either be 'highest_accuracy' or 'fastest_turnaround'. If not specified, the default would be 'highest_accuracy' <br/> <br/> `ignore_duplicate_file:String` - Whether to allow files with the same name and size that match with your recent upload. If not specified by default 'false' | Object with list_id | Verify bulk email addresses through file upload                                                                                                                                                       |
| `getBulkVerifyProgressStatus({list_id})`         | `list_id:String ` - List id to know the current progress status            | Object with list progress status  | To know the current progress status of bulk verify request                                                                                                                   
| `downloadBulkVerifyResult({list_id})`         | `list_id:String` - List id to download the result    | Object with downloaded URL of verified result | Download verified result of the email list                                                                                                                   |
| `removeBulkVerifyList({list_id[, ignore_result]})`         | `list_id:String` - List id to remove <br/> <br/> `ignore_result:Boolean` - Overridable optional param with default true            | Object with removed list details | Remove bulk verified email list                                                                                                                   |
| `isCatchAllEmail({email[,timeout]})`         | `email:String` - Email address to verify <br/><br/>  `timeout:Number` - Overridable optional param with default 90,000 ms             | Object with email address catch all status | To know email address is accept all email type of not                                                                                                           |
| `isDisposableEmail({email[, timeout]})`         | `email:String` - Email address to verify, <br/><br/>  `timeout:Number` - Overridable optional param with default 90,000 ms       | Object with email address disposable status | To know email address is disposable or temporary                                                                              |
| `isBusinessEmail({email[, timeout]})`         | `email:String` - Email address to verify <br/><br/>  `timeout:Number` - Overridable optional param with default 90,000 ms           | Object with email address business status  | To know email address belong to work or business                                                                                                          |
| `isFreeEmail({email[, timeout]})`         | `email:String` - Email address to verify, <br/> <br/> `timeout:Number` - Overridable optional param with default 90,000 ms        | Object with email address free account status  | To know email address belong to free email service providers                                                                                                                  |
| `isRoleEmail({email[, timeout]})`         | `email:String` - Email address to verify, <br/><br/>  `timeout:Number` - Overridable optional param with default 90,000 ms        | Object with email address role account status  | To know email address belong to group or role based account                                                                                                        |
| `isGibberishEmail({email[, timeout]})`         | `email:String` - Email address to verify, <br/><br/>  `timeout:Number` - Overridable optional param with default 90,000 ms        | Object with email address to indicate gibberish account  | To know email address belong to gibberish account                                                                                                                   |


### Email Finder Service 
`clearout.emailFinder` is ready to use object that has the following methods for finding an email address in real-time or to find email addresses of prospects from bulk file 


| Method               | Parameters       | Return     | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `find({name,domain[, timeout,queue]})`        | `name:String` - Person name<br/> `domain:String` - Person company name / domain<br/> <br/>  `timeout:Number` - Overridable optional param with default 30,000 ms<br/> <br/> `queue:Boolean` - Flag to indicate whether email discovery can be performed in background even after the request timed out  | Object with found email address or request queue id if request not fulfilled with in timeout | Instantly discover email address of any person giving their name and domain or company name                                                                                                                                                                                     |
| `getStatus({qid})`        | `qid:String` -  Queue ID received as part of the instant email finder response object      | Object with found email address or progress status  | To know the email finder request status in queue                                                                                                                                                                                     |
| `bulkFind({file,[, ignore_duplicate_file]})` | `file:FileObject` - Absolute file path that contains person name and company name / domain to be uploaded  <br/><br/>  `ignore_duplicate_file:String` - Whether to allow files with the same name and size that match with your recent upload. If not specified by default 'false' | Object with file list id  | File bulk email addresses through file upload                                                                                                                                                                                              |
| `getBulkFindProgressStatus({list_id})`         | `list_id:String` - List id for which to know the current progress status                      | Object with bulk find email status | To know the current progress status of bulk email find request                                                                                                                     |
| `downloadBulkFindResult({list_id})`         | `list_id:String` - List id for result download         |   Object with downloaded URL of email finder result | Download email finder result of the list                                                                                                                   |
| `removeBulkFindList({list_id[, ignore_result]})`         | `list_id:String` - List id to remove <br/><br/>  `ignore_result:Boolean` - Overridable optional param with default true | Object with removed list details  | Remove bulk email finder list     |

## Testing
To confirm that your integration works as intended without incurring credits, use the test email addresses listed below for all possible email verification results.

| `Test Email Address`  |  `Description`    |
| ------------ | --------- |
| invalid@example.com | An invalid email address | 
| valid@example.com | An valid email address |
| catch_all@example.com | Accept-all or Catch-all email address|
| unknown@example.com | An unknown email address |
| safe_to_send_yes@example.com | Safe to send email address  |
| safe_to_send_no@example.com | Not a safe to send email address|
| safe_to_send_risky@example.com | Risky email address|
| disposable@example.com |  Disposable email address |
| role@example.com | Role or group based email address|
| free@example.com | Free mail server provider email address|
| gibberish@example.com | Gibberish email address |
| hard_bounce@example.com | Hard bounce email address|
| soft_bounce@example.com | Soft bounce email address|
| suggested_email_address@example.com | An auto-suggested email address |
| syntax_error@example.com | Syntax error email address |
| greylisted@example.com | Greylisted email address |
| spamtrap@example.com | Spamtrap email address |
| blacklisted_email_address@example.com | Found part of blacklisted email address |
| whitelisted_email_address@example.com | Found part of whitelisted email address |
| blacklisted_domain@example.com | Found part of blacklisted domain |
| whitelisted_domain@example.com | Found part of whitelisted domain |
| domain_not_found@example.com | Domain does not exist email address |
| not_a_mailserver@example.com | Not a mail server email address |
| mailbox_not_found@example.com | Mailbox not found email address|
| mailbox_quota_exceeded@example.com | Mail quota exceeded email address|
| dns_query_timeout@example.com | DNS query timeout email address |
| unroutable_mailserver@example.com | Unroutable mail exchange server email address |
| overquota_and_inactive@example.com | Dormant email address |
| receiving_limit_reached@example.com | Receiving limit execeed email address |


## Versioning

This library follows [Semantic Versioning](http://semver.org/).

This library is considered to be **stable**. Issues and requests against **stable** libraries are addressed with the highest priority.


More Information: 
<br/>[Clearout API Docs](https://docs.clearout.io)
<br/>[Help](https://clearout.io/help)

## Contributing

Contributions are welcome! Please reach out to `us@clearout.io`

## MIT License

Copyright (c) 2022 - https://clearout.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.