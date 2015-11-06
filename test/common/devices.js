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

  function check (params) {
    var result
    for (var i in params.list) {
      result = ua(params.list[i])
      expect(result.device).to.equal(params.device)
      expect(result.platform).to.equal(params.platform)
    }
  }
})
