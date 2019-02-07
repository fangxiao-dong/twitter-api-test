'use strict';

const test = require('ava');
const query = require('./configs/meta');
const oauthKeys = require('./constants/oauth');
const getOauthString = require('./lib/getoauthstring');
const getOauthSignature = require('./lib/getoauthsignature');
const get = require('./lib/promisifyget.js');
const crypto = require('crypto');
const moment = require('moment');

const randomData = crypto.randomBytes(32).toString('base64');

oauthKeys['oauth_nonce'] = randomData;
oauthKeys['oauth_timestamp'] = (moment() / 1000);
oauthKeys['oauth_signature'] = getOauthSignature(query, oauthKeys);

const options = {
  hostname: 'api.twitter.com',
  path: `/1.1/search/tweets.json?q=${query.q}&count=${query.count}&locale=${query.locale}`,
  headers: {
    'Authorization': getOauthString(oauthKeys)
  }
};

test('Get twitter search API test', async t => {
  const [body, statusCode] = await get(options);
  const parsedBody = JSON.parse(body).statuses[0];

  t.is(statusCode, 200, 'status code should be 200 for a successful GET');

  if (!(parsedBody.truncated)) {
    console.log(parsedBody.text);
    t.true(/\bTesla\b/i.test(parsedBody.text), 'response text should include querying keywoards.');
  }
});
