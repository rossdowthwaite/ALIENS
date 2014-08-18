'use strict';

var Crate = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'crate', frame);

  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enableBody(this);
  this.health = 4;
  this.body.immovable = true;
  
};

Crate.prototype = Object.create(Phaser.Sprite.prototype);
Crate.prototype.constructor = Crate;

Crate.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Crate.prototype.hurt = function() {
	this.health--;
}

module.exports = Crate;
