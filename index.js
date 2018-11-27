'use strict';

const test = require('ava');
const query = require('./meta');
const oauthKeys = require('./oauth');
const getOauthString = require('./getoauthstring');
const getOauthSignature = require('./getoauthsignature');
const get = require('./promisifyget.js');

const randomData = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

oauthKeys["oauth_timestamp"] = Math.floor((new Date().getTime() / 1000)).toString();
oauthKeys["oauth_nonce"] = randomData;
oauthKeys["oauth_signature"] = getOauthSignature(query, oauthKeys);

const options = {
    hostname: 'api.twitter.com',
    path: `/1.1/search/tweets.json?q=${query.q}&count=${query.count}`,
    headers: {}
};

options.headers["Authorization"] = getOauthString(oauthKeys);

test('Get twitter search API test', async t => {
    const [body, statusCode] = await get(options);
    const parsedBody = JSON.parse(body).statuses[0];

    t.is(statusCode, 200, 'status code should be 200 for a successful GET');

    if (!parsedBody.truncated) {
        console.log(parsedBody.text);
        t.true(/\bTesla\b/.test(parsedBody.text), 'response text should include string "Tesla".');
    }
});