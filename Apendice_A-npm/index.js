var request = require('request')

request('http://www.google.com.br', (err, res, body) => {
  console.log(err);
  console.log(res.statusCode);
  console.log(body);
})