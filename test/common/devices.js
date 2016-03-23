'use strict'
describe('devices', function () {
  var ua = require('../../')
  var useragents = require('./useragents/list')
  it('samsung smart-tv', function () {
    check({
      list: useragents.samsungSmartTv,
      platform: 'samsung',
      device: 'tv'
    })
  })

  it('lg smart-tv', function () {
    check({
      list: useragents.lgSmartTv,
      platform: 'lg',
      device: 'tv'
    })
  })

  it('chromeCast', function () {
    check({
      list: useragents.chromeCast,
      platform: 'chromecast',
      device: 'chromecast'
    })
  })

  it('iPhone', function () {
    check({
      list: useragents.iPhone,
      platform: 'ios',
      device: 'phone'
    })
  })

  it('iPad', function () {
    check({
      list: useragents.iPad,
      platform: 'ios',
      device: 'tablet'
    })
  })

  it('android phone', function () {
    check({
      list: useragents.androidPhone,
      // browser
      platform: 'android',
      device: 'phone'
    })
  })

  it('android tablet', function () {
    check({
      list: useragents.androidTablet,
      platform: 'android',
      device: 'tablet'
    })
  })

  it('stick tv', function () {
    check({
      list: useragents.sticktv,
      platform: 'android',
      device: 'sticktv'
    })
  })

  it('fire tv', function () {
    check({
      list: useragents.firetv,
      platform: 'android',
      device: 'firetv'
    })
  })

  it('riks tv', function () {
    check({
      list: useragents.rikstv,
      platform: 'rikstv',
      device: 'rikstv'
    })
  })

  function check (params) {
    var result
    for (var i in params.list) {
      result = ua(params.list[i])
      expect(result.device).to.equal(params.device)
      expect(result.platform).to.equal(params.platform)
    }
  }
})
