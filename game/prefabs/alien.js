'use strict';

var Alien = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'alien', frame);

  game.physics.arcade.enableBody(this);

  this.body.collideWorldBounds = true;
  this.body.width = this.body.width/2;
  this.body.height = this.body.height/2;
  this.anchor.setTo(0.5, 0.5);
  this.hostile = false;
  this.health = 100;

  this.animations.add('walk', [0, 1], 5, true);

  // this.poo = game.add.sprite(this.x, this.y, "ping");
  // this.poo.alpha = 1;
  // this.poo.anchor.setTo(0.5,0.5);
  // this.poo.width = 40;
  // this.poo.height = 40;

  // game.physics.ninja.enableCircle(this.poo, 100);
};

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

Alien.prototype.update = function() {
  
  this.animations.play('walk');
  // this.poo.x = this.x;
  // this.poo.y = this.y;
  // this.poo.body.x = this.x;
  // this.poo.body.y = this.y;
};

Alien.prototype.hurt = function(amount) {
	this.health -= amount;
};

Alien.prototype.removeFromGame = function() {
  this.kill();
};

module.exports = Alien;
