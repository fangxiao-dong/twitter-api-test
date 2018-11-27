'use strict';

const httpMethod = 'GET',
    baseURL = 'https://api.twitter.com/1.1/search/tweets.json',
    consumer_secret = 'NOMF5ZdA7ihQlbOOD2zcT59P6KCBNLu1V9Gw4Q4fQZKFOqNmIC',
    token_secret = 'GldfVSNSdyyI7UJDAPpT9dIezh9EeKLNNDpKKFO0Ag0ZU',
    crypto = require('crypto');


module.exports = function(query, oauthKeys) {
    let sigBaseString = '',
        signingKey = '';

    let parameters = Object.assign(query, oauthKeys);

    for (var key in parameters) {
      if (!parameters.hasOwnProperty(key)) continue;
      key = encodeURIComponent(key), parameters[key] = encodeURIComponent(parameters[key]);
    }

    Object.keys(parameters).sort().forEach((key) => {
        sigBaseString += key + '=' + parameters[key] + '&'
    });

    sigBaseString = sigBaseString.substring(0, sigBaseString.length -1);

    sigBaseString = httpMethod + '&' + encodeURIComponent(baseURL) + '&' + encodeURIComponent(sigBaseString);

    signingKey = encodeURIComponent(consumer_secret) + '&' + encodeURIComponent(token_secret);

    let signature = crypto.createHmac('sha1', signingKey).update(sigBaseString).digest('base64');
    return signature;
};
