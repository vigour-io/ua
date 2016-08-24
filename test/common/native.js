'use strict'
var test = require('tape')
var ua = require('../../')
var useragents = require('./useragents/list')

test('native - ploy', function (t) {
  check({
    list: useragents.ployNative,
    webview: 'ploy-native'
  }, t)
  t.end()
})

function check (params, t) {
  var result
  for (var i in params.list) {
    result = ua(params.list[i])
    t.equals(result.webview, params.webview, 'equals webview')
  }
}
