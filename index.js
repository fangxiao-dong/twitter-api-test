'use strict';

const test = require('ava');
const query = require('./meta');
const oauthKeys = require('./oauth');
const getOauthString = require('./getoauthstring');
const getOauthSignature = require('./getoauthsignature');
const get = require('./promisifyget.js');
const crypto = require('crypto');
const moment = require('moment');

const randomData = crypto.randomBytes(32).toString('base64');
oauthKeys['oauth_nonce'] = randomData;

// oauthKeys["oauth_timestamp"] = Math.floor((new Date().getTime() / 1000)).toString();
oauthKeys['oauth_timestamp'] = (moment() / 1000);
oauthKeys['oauth_signature'] = getOauthSignature(query, oauthKeys);

const options = {
  hostname: 'api.twitter.com',
  path: `/1.1/search/tweets.json?q=${query.q}&count=${query.count}`,
  headers: {
    'Authorization': getOauthString(oauthKeys)
  }
};

test('Get twitter search API test', async t => {
  const [body, statusCode] = await get(options);
  const parsedBody = JSON.parse(body).statuses[0];

  t.is(statusCode, 200, 'status code should be 200 for a successful GET');

  if (!(parsedBody.truncated) && !(parsedBody.retweeted)) {
    console.log(parsedBody.text);
    t.true(/\bTesla\b/i.test(parsedBody.text), 'response text should include string "Tesla".');
  }
});
