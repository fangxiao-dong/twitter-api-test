'use strict';

const httpMethod = 'GET';

const baseURL = 'https://api.twitter.com/1.1/search/tweets.json';

const consumerSecret = 'NOMF5ZdA7ihQlbOOD2zcT59P6KCBNLu1V9Gw4Q4fQZKFOqNmIC';

const tokenSecret = 'GldfVSNSdyyI7UJDAPpT9dIezh9EeKLNNDpKKFO0Ag0ZU';

const crypto = require('crypto');

module.exports = function (query, oauthKeys) {
  let sigBaseString = '';

  let signingKey = '';

  let parameters = Object.assign(query, oauthKeys);

  for (var key in parameters) {
    if (!parameters.hasOwnProperty(key)) continue;
    key = encodeURIComponent(key);
    parameters[key] = encodeURIComponent(parameters[key]);
  }

  Object.keys(parameters).sort().forEach((key) => {
    sigBaseString += key + '=' + parameters[key] + '&';
  });

  sigBaseString = sigBaseString.substring(0, sigBaseString.length - 1);

  sigBaseString = httpMethod + '&' + encodeURIComponent(baseURL) + '&' + encodeURIComponent(sigBaseString);

  signingKey = encodeURIComponent(consumerSecret) + '&' + encodeURIComponent(tokenSecret);

  let signature = crypto.createHmac('sha1', signingKey).update(sigBaseString).digest('base64');
  return signature;
};
