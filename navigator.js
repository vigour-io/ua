const ua = require('./')
ua(typeof window !== 'undefined' && window.navigator.userAgent, exports)
