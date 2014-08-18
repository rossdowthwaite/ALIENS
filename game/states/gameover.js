
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

    this.gameOverText = this.game.add.bitmapText(this.game.world.centerX-300, this.game.world.centerY, 'main_font','GAME OVER MAN!', 64);

    this.instructionText = this.game.add.text(this.game.world.centerX, 450, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);

  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;
