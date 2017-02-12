'use strict'
var test = require('tape')
var ua = require('../../')
var useragents = require('./useragents/list')

test('browsers - edge', function (t) {
  check({
    list: useragents.edge,
    browser: 'edge'
  }, t)
  t.end()
})

test('browsers - firefox', function (t) {
  check({
    list: useragents.firefox,
    browser: 'firefox'
  }, t)
  t.end()
})

test('browsers - ie', function (t) {
  check({
    list: useragents.ie,
    browser: 'ie'
  }, t)
  t.end()
})

function check (params, t) {
  var result
  for (var i in params.list) {
    result = ua(params.list[i])
    t.equals(result.browser, params.browser, 'equals browser')
  }
}
