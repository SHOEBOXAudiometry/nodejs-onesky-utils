'use strict';

var queryString = require('querystring');

var _private = rootRequire('lib/privateFunctions.js');
var _globals = rootRequire('lib/globals.js');

var apiAddress = _globals.apiAddress;

/**
 * SHOW a quotation
 * @param  {Object} options
 * @param  {Number} options.projectId Project ID
 * @param  {String} options.secret Private key to OneSky API
 * @param  {String} options.apiKey Public key to OneSky API
 * @param  {[String]} options.files Files to be translated in the order
 * @param  {String} options.toLocale Target language to tranlate
 * @param  {Boolean} options.includeNotTranslated Include not translated phrases to translate
 * @param  {Boolean} options.includeNotApproved Include not approved phrases to translate
 * @param  {Boolean} options.includeOutdated Include outdated phrases to translate that is updated since last order.
 * @param  {String} options.specialization Specify specialization in order to translate phrases in a specific area.  
 */
function getQuotation(options) {
  options.hash = _private.getDevHash(options.secret);
  return _private.makeRequest(_getLink(options), 'Unable to fetch quotations');
}

/**
 * @param  {Object} options
 * @return {String}
 * @private
 */
function _getLink(options) {
  return apiAddress + '/1/projects/' + options.projectId + '/quotations?' + queryString.stringify({
    api_key: options.apiKey,
    timestamp: options.hash.timestamp,
    dev_hash: options.hash.devHash,
    files: options.files,
    to_locale: options.toLocale,
    is_including_not_translated: options.includeNotTranslated,
    is_including_not_approved: options.includeNotApproved,
    is_including_outdated: options.includeOutdated,
    specialization: options.specialization
  });
}

module.exports = getQuotation;
