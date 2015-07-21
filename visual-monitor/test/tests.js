'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha

var capsConfig = {
  'chrome': {
    'browserName' : 'chrome',
    'version' : '43.0',
    'platform' : 'OS X 10.10'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://marketplace.commerceguys.com';

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the buy now page',function(done) {
    client
      .url(baseUrl + '/platform/buy-now')
      .click('#popup-buttons button')
      .pause(5000)
      .webdrivercss(testName + '.buy-now', {
        name: '1',
        exclude: [
          '.total',
          '.cost',
          '#number'
        ],
        screenWidth: selectedCaps == 'chrome' ? [320,640,960, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });
});
