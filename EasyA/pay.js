const https = require('https')
const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/verify/:reference',
  method: 'POST',
  headers: {
    Authorization: 'sk_live_491b3b98d60eb754259f527c1d5a9663b4779f11'
  }
}
let data = ''
https.request(options, res => {
  res.on('data', (chunk) => {
    data += chunk
  });
  res.on('end', () => {
    console.log(JSON.parse(data))
  });
}).on('error', error => {
  console.error(error)
});
module.exports = data;