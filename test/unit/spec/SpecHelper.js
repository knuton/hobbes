function fillFixtureContainer (elem) {
  var fixtureContainer = document.getElementById('jasmine-fixtures')
  fixtureContainer.innerHTML = '';
  fixtureContainer.appendChild(elem);
};
// beforeEach(function() {
//   this.addMatchers({
//     toBePlaying: function(expectedSong) {
//       var player = this.actual;
//       return player.currentlyPlayingSong === expectedSong
//           && player.isPlaying;
//     }
//   })
// });
