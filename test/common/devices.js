'use strict'

var test = require('tape')
var ua = require('../../')
var useragents = require('./useragents/list')

test('devices - samsung smart-tv', function (t) {
  t.plan(useragents.samsungSmartTv.length * 3)
  check({
    list: useragents.samsungSmartTv,
    platform: 'samsung',
    device: 'tv',
    touch: false
  }, t)
})

test('devices - lg smart-tv', function (t) {
  t.plan(useragents.lgSmartTv.length * 3)
  check({
    list: useragents.lgSmartTv,
    platform: 'lg',
    device: 'tv',
    touch: false
  }, t)
})

test('devices - chromeCast', function (t) {
  t.plan(useragents.chromeCast.length * 3)
  check({
    list: useragents.chromeCast,
    platform: 'chromecast',
    device: 'chromecast',
    touch: false
  }, t)
})

test('devices - iPhone', function (t) {
  t.plan(useragents.iPhone.length * 3)
  check({
    list: useragents.iPhone,
    platform: 'ios',
    device: 'phone',
    touch: true
  }, t)
})

test('devices - iPad', function (t) {
  t.plan(useragents.iPad.length * 3)
  check({
    list: useragents.iPad,
    platform: 'ios',
    device: 'tablet',
    touch: true
  }, t)
})

test('devices - android phone', function (t) {
  t.plan(useragents.androidPhone.length * 3)
  check({
    list: useragents.androidPhone,
    platform: 'android',
    device: 'phone',
    touch: true
  }, t)
})

test('devices - android tablet', function (t) {
  t.plan(useragents.androidTablet.length * 3)
  check({
    list: useragents.androidTablet,
    platform: 'android',
    device: 'tablet',
    touch: true
  }, t)
})

test('devices - stick tv', function (t) {
  t.plan(useragents.sticktv.length * 3)
  check({
    list: useragents.sticktv,
    platform: 'android',
    device: 'sticktv',
    touch: false
  }, t)
})

test('devices - fire tv', function (t) {
  t.plan(useragents.firetv.length * 3)
  check({
    list: useragents.firetv,
    platform: 'android',
    device: 'firetv',
    touch: false
  }, t)
})

test('devices - riks tv', function (t) {
  t.plan(useragents.rikstv.length * 3)
  check({
    list: useragents.rikstv,
    platform: 'rikstv',
    device: 'rikstv',
    touch: false
  }, t)
})

function check (params, t) {
  var result
  for (var i in params.list) {
    result = ua(params.list[i])
    t.equals(result.device, params.device, 'equals device')
    t.equals(result.platform, params.platform, 'equals platform')
    t.equals(result.touch, params.touch, 'equals touch')
  }
}
