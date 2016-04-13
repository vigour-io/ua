/**
 * @function ua
 * Returns an object representing the user agent including data such as browser, device and platform
 * @param {string} _ua - the raw user agent string to be converted
 * @param {string} obj - (optional) object to be merged to the output result
 * @returns {object} object representing your user agent
 */
module.exports = exports = function (_ua, obj) {
  if (typeof _ua === 'string') {
    _ua = _ua.toLowerCase()
  } else {
    _ua = ''
  }
  if (obj === true) {
    obj = exports
  } else if (!obj) {
    obj = {}
  }
  // _ua = 'webos; linux - large screen'
  var _ff = 'firefox'
  var _android = 'android'
  var _mobile = '.+mobile'
  var _webkit = 'webkit'
  var _ps = 'playstation'
  var _xbox = 'xbox'
  var _linux = 'linux'
  var _castDetect = 'crkey'
  var _chromecast = 'chromecast'
  var _tablet = 'tablet'
  var _windows = 'windows'
  var _phone = 'phone'
  var _firetv = 'firetv'
  var _sticktv = 'sticktv'
  var _rikstv = 'rikstv'
  var _facebook = 'facebook'

  /**
   * browser detection
   */
  test.call(obj, _ua,
    function (query, arr) {
      obj.browser = arr[ 2 ] || query
      var _v = _ua.match(
        new RegExp('((([\\/ ]version|' + arr[ 0 ] + '(?!.+version))[\/ ])| rv:)([0-9]{1,4}\\.[0-9]{0,2})')
      )
      obj.version = _v ? Number(_v[ 4 ]) : 0
      obj.prefix = arr[ 1 ]
      // TODO: add prefix for opera v>12.15;
      // TODO: windows check for ie 11 may be too general;
    },
    [ true, _webkit ],
    [ '\\(windows', 'ms', 'ie' ],
    [ 'safari', _webkit ],
    [ _ff, 'Moz' ],
    [ 'opera', 'O' ],
    [ 'msie', 'ms', 'ie' ],
    [ _facebook, _facebook ],
    [ 'chrome|crios\/', _webkit, 'chrome' ]
  )

  /**
   * platform detection
   */
  test.call(obj, _ua, 'platform',
    [ true, _windows ],
    [ _linux, _linux ],
    [ 'lg.{0,3}netcast', 'lg' ], // TODO:propably need to add more!
    [ _ff + _mobile, _ff ],
    [ 'mac os x', 'mac' ], [ 'iphone|ipod|ipad', 'ios' ],
    [ _xbox, _xbox ],
    [ _ps, _ps ],
    [ _android, _android ],
    [ _windows, _windows ],
    [ _castDetect, _chromecast ],
    [ 'smart-tv;|;samsung;smarttv', 'samsung' ], // SmartTV2013
    [ _rikstv, _rikstv ]
  )

  /**
   * device detection
   */
  test.call(obj, _ua, 'device',
    [ true, 'desktop' ],
    [ _windows + '.+touch|ipad|' + _android, _tablet ],
    [
      'phone|iphone|(' +
      _android + _mobile + ')|(' + _ff + _mobile +
      ')|' + _windows + ' phone|iemobile', _phone
    ],
    [ _xbox + '|' + _ps, 'console' ],
    [ 'tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos.+large', 'tv' ],
    [ _castDetect, _chromecast ],
    [ 'tablet|amazon-fireos|nexus (?=[^1-6])\\d{1,2}', _tablet ],
    [ 'aftb|afts', _firetv ],
    [ 'aftm', _sticktv ],
    [ _rikstv, _rikstv ]
  )

  test.call(obj, _ua, 'webview',
    [ true, false ],
    [ 'vigour-wrapper', true ],
    [ 'crosswalk', true ],
    [ 'cordova', true ]
  )

  return obj

  /**
   * test
   * search for regexps in the userAgent
   * fn is a on succes callback
   * check tests in https://github.com/faisalman/ua-parser-js to test for userAgents
   * @method
   */
  function test (_ua, fn) {
    for (var tests = arguments, i = tests.length - 1, query = tests[i][0]; query !== true && !new RegExp(query).test(_ua) && i > 0; query = tests[--i][0]); //eslint-disable-line
    // this for has no body
    if (fn.slice || fn.call(this, query, tests[i])) {
      this[fn] = tests[i][1]
    }
  }
}
