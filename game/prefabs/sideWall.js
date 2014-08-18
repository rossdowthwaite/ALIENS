'use strict';


var SideWall = function(game, x, y, width, length) {

  this.bmd = game.add.bitmapData(width,length);
  this.bmd.ctx.beginPath();
  this.bmd.ctx.rect(0,0, width,length);
  this.bmd.ctx.fillStyle = '#424242';
  this.bmd.ctx.fill();

  Phaser.Sprite.call(this, game, x, y, this.bmd);

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
};

SideWall.prototype = Object.create(Phaser.Sprite.prototype);
SideWall.prototype.constructor = SideWall;

SideWall.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = SideWall;
