/**
 * @function ua
 * Returns an object representing the user agent including data such as browser, device and platform
 * @param {string} _ua - the raw user agent string to be converted
 * @param {string} obj - (optional) object to be merged to the output result
 * @returns {object} object representing your user agent
 */
module.exports = exports = function (_ua, obj) {
  if (!obj) obj = {}
  // _ua = 'webos; linux - large screen'
  var node = 'node.js'
  var _ff = 'firefox'
  var _mac = 'mac'
  var _chrome = 'chrome'
  var _android = 'android'
  var _wrapper = 'wrapper'
  var _mobile = '.+mobile'
  var _webkit = 'webkit'
  var _ps = 'playstation'
  var _xbox = 'xbox'
  var _linux = 'linux'
  var _castDetect = 'crkey'
  var _chromecast = 'cast'
  var _tablet = 'tablet'
  var _windows = 'windows'
  var _phone = 'phone'
  var _facebook = 'facebook'
  var _edge = 'edge'
  var _version = 'version'
  var _samsung = 'samsung'

  var _fullUA = typeof _ua === 'string' ? _ua.toLowerCase() : node
  var _vendorIdx = _fullUA.indexOf('*vg*')
  _ua = ~_vendorIdx ? _fullUA.substring(0, _vendorIdx - 1) : _fullUA

  /**
   * browser detection
   */
  test.call(obj, _ua,
    function (query, arr) {
      obj.browser = arr[2] || query
      var _v = _ua.match(
        new RegExp('((([\\/ ]' + _version + '|' + arr[ 0 ] + '(?!.+' + _version + '))[/ ])| rv:)([0-9]{1,4}\\.[0-9]{0,2})')
      )
      obj[_version] = _v ? Number(_v[4]) : 0
      obj.prefix = arr[1]
      // TODO: add prefix for opera v>12.15;
      // TODO: windows check for ie 11 may be too general;
    },
    [ true, _webkit ],
    [ '\\(' + _windows, 'ms', 'ie' ],
    [ 'safari', _webkit ],
    [ _ff, 'moz' ],
    [ 'opera', 'O' ],
    [ 'msie', 'ms', 'ie' ],
    [ _facebook ],
    [ _chrome + '|crios/', _webkit, _chrome ],
    [ _edge, _webkit, _edge ],
    [ node, false, true ]
  )

  /**
   * platform detection
   */
  test.call(obj, _ua, 'platform',
    [ true, _windows ],
    [ _linux ],
    [ 'lg.{0,3}netcast', 'lg' ], // TODO:propably need to add more!
    [ _ff + _mobile, _ff ],
    [ _mac + ' os x', _mac ],
    [ 'iphone|ipod|ipad', 'ios' ],
    [ _xbox ],
    [ _ps ],
    [ _android ],
    [ _windows ],
    [ _castDetect, _chromecast ],
    [ 'smart-tv;|;' + _samsung + ';smarttv', _samsung ], // SmartTV2013
    [ node ]
  )

  /**
   * device detection
   */
  test.call(obj, _ua, 'device',
    [ true, 'desktop' ],
    [ _windows + '.+touch|ipad|' + _android, _tablet ],
    [
      _phone + '|phone|(' +
      _android + _mobile + ')|(' + _ff + _mobile +
      ')|' + _windows + ' phone|iemobile', _phone
    ],
    [ _xbox + '|' + _ps, 'console' ],
    [ _castDetect, _chromecast ],
    [ _tablet + '|amazon-fireos|nexus (?=[^1-6])\\d{1,2}', _tablet ],
    [ '\\btv\\b|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos.+large|viera|aft[bsm]|bravia', 'tv' ],
    [ 'mozilla\\/5.0 \\(compatible; .+http:\\/\\/', 'bot' ],
    [ node, 'server' ]
  )

  /**
   * wrapped webview native app detection
   */
  test.call(obj, _fullUA, 'webview',
    [ true, false ],
    [ 'crosswalk' ],
    [ 'vigour-' + _wrapper, _wrapper ],
    [ 'cordova' ],
    [ 'ploy-native' ]
  )

  return obj

  /**
   * test
   * search for regexps in the userAgent
   * fn is a on success callback
   * check tests in https://github.com/faisalman/ua-parser-js to test for userAgents
   * @method
   */
  function test (_ua, fn) {
    for (
      var tests = arguments, i = tests.length - 1, t = tests[i], query = t[0];
      query !== true && !new RegExp(query).test(_ua) && i > 0;
      t = tests[--i], query = t[0]
    ); //eslint-disable-line
    // this for has no body
    if (fn.slice || fn.call(this, query, t)) {
      this[fn] = t[1] === void 0 ? query : t[1]
    }
  }
}
