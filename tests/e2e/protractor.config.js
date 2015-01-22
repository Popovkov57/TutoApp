exports.config = {
  capabilities: {
    // You can use other browsers
    // like firefox, phantoms, safari, IE (-_-)
    'browserName': 'chrome'
  },
  specs: [
  // We are going to make this file in a minute
  'becomeAwesome.spec.js'
  ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 40000,
    isVerbose: true,
  },
  allScriptsTimeout: 50000,
  onPrepare: function(){
    browser.driver.get('http://localhost:3000');
  }
};


// conf.js
// exports.config = {
//   seleniumAddress: 'http://localhost:4444/wd/hub',
//   specs: ['spec.js']
// }
