'use strict';

module.exports = function (oauthKeys) {
  let results = 'OAuth ';
  for (var key in oauthKeys) {
    if (!oauthKeys.hasOwnProperty(key)) continue;
    results += encodeURIComponent(key) + '=' + '"' + encodeURIComponent(oauthKeys[key]) + '"' + ', ';
  }
  return results.substring(0, results.length - 2);
};
