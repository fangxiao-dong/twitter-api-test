'use strict';

const https = require('https');
const { promisify } = require('util');

https.get[promisify.custom] = (params) => {
  return new Promise((resolve, reject) => {
    let req = https.get(params, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error('statusCode=' + res.statusCode));
      }

      let body = '';
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve([body, res.statusCode]);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = promisify(https.get);

// TEST: GET request to return all countrys information
// (async () => {
//   const get = promisify(https.get);
//   let body = JSON.parse((await get('https://restcountries.eu/rest/v2/all'))[0]);
//   console.log(body);
// })();
