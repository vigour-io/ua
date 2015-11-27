# ua
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-ua.svg)](https://badge.fury.io/js/vigour-ua)
![travis](https://travis-ci.org/vigour-io/ua.svg?branch=master)

ua parser with a light footprint (~1kb)

### parse user agent strings
```javascript
var ua = require('vigour-ua')
var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.3'
console.log(ua(userAgent))
```

outputs
```
{
  "browser": "chrome",
  "version": 46,
  "prefix": "webkit",
  "platform": "mac",
  "device": "desktop"
}
```

### merge into objects
```javascript
var ua = require('vigour-ua')
var someObject = {
  randomField: true
}
console.log(ua(userAgent, someObject))
```

outputs `someObject`
```
{
  "browser": "chrome",
  "version": 46,
  "prefix": "webkit",
  "platform": "mac",
  "device": "desktop",
  "randomField": true
}
```

### merge into itself
```javascript
var ua = require('vigour-ua')
console.log(ua(userAgent, true))
// adds properties on the ua module
```

*This useragent parser does not catch all useragents, if you encounter a device thats wrongly parsed add a test!*
