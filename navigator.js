'use strict'
var ua = require('./')
if (typeof window === 'undefined') {
  ua.platform = 'node'
} else {
  ua(window.navigator.userAgent, exports)
}
