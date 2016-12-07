'use strict'
var test = require('tape')
var ua = require('../../')
var useragents = require('./useragents/list')

test('devices - samsung smart-tv', function (t) {
  t.plan(useragents.samsungSmartTv.length * 2)
  check({
    list: useragents.samsungSmartTv,
    platform: 'samsung',
    device: 'tv'
  }, t)
})

test('devices - lg smart-tv', function (t) {
  t.plan(useragents.lgSmartTv.length * 2)
  check({
    list: useragents.lgSmartTv,
    platform: 'lg',
    device: 'tv'
  }, t)
})

test('devices - chromeCast', function (t) {
  t.plan(useragents.chromeCast.length * 2)
  check({
    list: useragents.chromeCast,
    platform: 'cast',
    device: 'cast'
  }, t)
})

test('devices - iPhone', function (t) {
  t.plan(useragents.iPhone.length * 2)
  check({
    list: useragents.iPhone,
    platform: 'ios',
    device: 'phone'
  }, t)
})

test('devices - iPad', function (t) {
  t.plan(useragents.iPad.length * 2)
  check({
    list: useragents.iPad,
    platform: 'ios',
    device: 'tablet'
  }, t)
})

test('devices - android phone', function (t) {
  t.plan(useragents.androidPhone.length * 2)
  check({
    list: useragents.androidPhone,
    platform: 'android',
    device: 'phone'
  }, t)
})

test('devices - android tablet', function (t) {
  t.plan(useragents.androidTablet.length * 2)
  check({
    list: useragents.androidTablet,
    platform: 'android',
    device: 'tablet'
  }, t)
})

test('devices - stick tv', function (t) {
  t.plan(useragents.sticktv.length * 2)
  check({
    list: useragents.sticktv,
    platform: 'android',
    device: 'firetv'
  }, t)
})

test('devices - fire tv', function (t) {
  t.plan(useragents.firetv.length * 2)
  check({
    list: useragents.firetv,
    platform: 'android',
    device: 'firetv'
  }, t)
})

test('devices - riks tv', function (t) {
  t.plan(useragents.rikstv.length * 2)
  check({
    list: useragents.rikstv,
    platform: 'rikstv',
    device: 'rikstv'
  }, t)
})

function check (params, t) {
  var result
  for (var i in params.list) {
    result = ua(params.list[i])
    t.equals(result.device, params.device, 'equals device')
    t.equals(result.platform, params.platform, 'equals platform')
  }
}
