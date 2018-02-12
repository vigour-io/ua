'use strict'
var test = require('tape')
var ua = require('../../')
var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.3'
var defaultUA = {
  browser: true,
  version: 0,
  prefix: false,
  platform: 'node.js',
  device: 'server'
}

test('it returns an object', function (t) {
  t.plan(1)
  t.deepEquals(ua(userAgent), {
    browser: 'chrome',
    version: 46,
    prefix: 'webkit',
    platform: 'mac',
    device: 'desktop'
  })
})

test('it can merge into an object', function (t) {
  t.plan(1)
  var obj = {
    field: true
  }
  ua(userAgent, obj)
  t.deepEquals(obj, {
    browser: 'chrome',
    version: 46,
    prefix: 'webkit',
    platform: 'mac',
    device: 'desktop',
    field: true
  })
})

// test('it can merge into itself', function (t) {
//   t.plan(5)
//   ua(userAgent, true)
//   t.equals(ua.browser, 'chrome')
//   t.equals(ua.version, 46)
//   t.equals(ua.prefix, 'webkit')
//   t.equals(ua.platform, 'mac')
//   t.equals(ua.device, 'desktop')
// })

test('should work even if _ua === {}', function (t) {
  t.plan(1)
  t.deepEquals(ua({}), defaultUA)
})

test('should work even if _ua === false', function (t) {
  t.plan(1)
  t.deepEquals(ua({}), defaultUA)
})

test('should work even if _ua is a number', function (t) {
  t.plan(1)
  t.deepEquals(ua(42), defaultUA)
})

test('should work even it _ua is a function', function (t) {
  t.plan(1)
  var testFunction = function () {
    return 1 + 1
  }
  t.deepEquals(ua(testFunction), defaultUA)
})

test('should work even if _ua is an array', function (t) {
  t.plan(1)
  t.deepEquals(ua([]), defaultUA)
})

test('should work even if _ua === true', function (t) {
  t.plan(1)
  t.deepEquals(ua(true), defaultUA)
})
