var helper = {
  fillFixtureContainer : function (elem) {
    var fixtureContainer = document.getElementById('jasmine-fixtures')
    fixtureContainer.innerHTML = '';
    fixtureContainer.appendChild(elem);
  }
};

// exports for node.js
if (typeof exports === 'object') {
  var fs = require('fs');

  global.helper = helper;
  
  mockBrowser();

  global.hobbes = require('hobbes');
}

function mockBrowser () {
  global.navigator = {};
  global.window = {};

  // DOM
  global.document = {
    createElement : function (tag) {
      return {innerHTML : ''};
    },
    getElementById : function (id) {
      // For behavior on missing element
      if (id === 'missing') return null;
      // Save mock element so that changes can be tracked
      return global.document[id] = global.document[id] || {
        children : [],
        appendChild : function (elem) {this.children.push(elem);},
        innerHTML : '' 
      };
    }
  }
}

// beforeEach(function() {
//   this.addMatchers({
//     toBePlaying: function(expectedSong) {
//       var player = this.actual;
//       return player.currentlyPlayingSong === expectedSong
//           && player.isPlaying;
//     }
//   })
// });
