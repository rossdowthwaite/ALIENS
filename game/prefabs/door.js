'use strict';

var Door = function(game, x, y, room_one, room_two) {
  Phaser.Sprite.call(this, game, x, y, 'door');

  game.physics.arcade.enableBody(this);
  this.body.immovable = true;
  this.body.width = this.body.width/2;
  this.body.height = this.body.height/2;

  this.room_one = room_one;
  this.room_two = room_two;
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Door.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Door.prototype.destroy_door = function() {
	this.destroy();
};

module.exports = Door;
