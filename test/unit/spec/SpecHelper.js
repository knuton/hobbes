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
  global.window = {};
  // provide some mocks for DOM-stuff
  global.document = {
    createElement : function (tag) {
      return {innerHTML : ''};
    },
    getElementById : function (id) {
      if (id === 'missing') return null;
      return global.document[id] = global.document[id] || {
        children : [],
        appendChild : function (elem) {this.children.push(elem);},
        innerHTML : '' 
      };
    }
  }
  global.navigator = {};

  global.hobbes = require('hobbes');

  global.helper = helper;
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
