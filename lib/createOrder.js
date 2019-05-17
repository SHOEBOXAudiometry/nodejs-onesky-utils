
'use strict';

var queryString = require('querystring');

var _private = rootRequire('lib/privateFunctions.js');
var _globals = rootRequire('lib/globals.js');

var apiAddress = _globals.apiAddress;

/**
 * Create a new order
 * @param  {Object} options
 * @param  {Number} options.projectId Project ID
 * @param  {String} options.secret Private key to OneSky API
 * @param  {String} options.apiKey Public key to OneSky API
 * @param  {[String]} options.files Files to be translated in the order
 * @param  {String} options.toLocale Target language to tranlate
 * @param  {String} options.orderType Specify type of order
 * @param  {String} options.translatorType Specify type of translator used in translation
 * @param  {String} options.tone Specify the tone used in translation
 * @param  {Boolean} options.includeNotTranslated Include not translated phrases to translate
 * @param  {Boolean} options.includeNotApproved Include not approved phrases to translate
 * @param  {Boolean} options.includeOutdated Include outdated phrases to translate that is updated since last order.
 * @param  {String} options.specialization Specify specialization in order to translate phrases in a specific area.  
 * @param  {String} options.note Note to translator about this translation order
 */
function postFile (options) {
  options.hash = _private.getDevHash(options.secret);
  return _private.makeRequest(_getUploadOptions(options),
    'Unable to create translation order');
}

/**
 * @param  {Object} options
 * @return {Object}
 * @private
 */
function _getUploadOptions (options) {
  return {
    method: 'POST',
    url: apiAddress + '/1/projects/' + options.projectId + '/orders?' + queryString.stringify({
      api_key: options.apiKey,
      timestamp: options.hash.timestamp,
      dev_hash: options.hash.devHash
    }),
    formData: {
      api_key: options.apiKey,
      dev_hash: options.hash.devHash,
      timestamp: options.hash.timestamp.toString(),
      files: options.files,
      to_locale: options.toLocale,
      order_type: options.orderType,
      translator_type: options.translatorType,
      tone: options.tone,
      is_including_not_translated: options.includeNotTranslated,
      is_including_not_approved: options.includeNotApproved,
      is_including_outdated: options.includeOutdated,
      specialization: options.specialization,
      note: options.note
    }
  };
}
module.exports = postFile;
