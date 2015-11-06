'use strict'
var isNode = typeof window !== 'undefined'

module.exports = exports = function (_ua, obj) {
  _ua = _ua.toLowerCase()
  if (obj === true) {
    obj = exports
  }
  if (!obj) {
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
    [ 'smart-tv;|;samsung;smarttv', 'samsung' ] // SmartTV2013
  )

  /**
   * device detection
   */
  test.call(obj, _ua, 'device',
    [ true, 'desktop' ],
    [ _windows + '.+touch|ipad|' + _android, _tablet ],
    [
      'iphone|(' +
      _android + _mobile + ')|(' + _ff + _mobile +
      ')|' + _windows + ' phone|iemobile', _phone
    ],
    [ _xbox + '|' + _ps, 'console' ], [ 'tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos.+large', 'tv' ],
    [ _castDetect, _chromecast ], [ 'amazon-fireos', _tablet ]
  )
  // TODO: amazon firetv and phone

  // iphone6plus used as boundary for "phone sized"
  var iphone6plus = 414 * 736
  if (
    obj.platform === _android &&
    !isNode && obj.device === _phone &&
    window.innerWidth * window.innerHeight > iphone6plus
    // && ~_ua.indexOf('crosswalk')
  ) {
    obj.device = 'tablet'
  }
  return obj
}

/**
 * test
 * search for regexps in the userAgent
 * fn is a on succes callback
 * check http://www.useragentstring.com/ to test for userAgents
 * @method
 */
function test (_ua, fn) {
  for (var tests = arg(arguments, 1), i = tests.length - 1, query = tests[i][0]; query !== true && !new RegExp(query).test(_ua); query = tests[--i][0]); //eslint-disable-line
  if (fn.slice || fn.call(this, query, tests[i])) {
    this[ fn ] = tests[ i ][ 1 ]
  }
}

function arg (args, slice) {
  return Array.prototype.slice.call(args, slice)
}
