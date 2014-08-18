
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.gameMusic = this.game.add.audio('gameMusic',1,true); // make it loop
    this.gameMusic.play('',0,1,true);

    this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY , 'intro');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.bmpText = this.game.add.bitmapText(this.game.world.centerX - 100, this.game.world.centerY + 150, 'main_font','ALIENS', 64);

    this.sprite.alpha = 0;
    this.game.add.tween(this.sprite).to({alpha: 1}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
