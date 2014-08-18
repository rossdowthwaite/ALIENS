var Wall =  require('../prefabs/sideWall');
var THICKNESS = 3;
var doorX = 0;
var doorY = 0;
var lighting;

'use strict';

var Room = function(game, width, height, lighting) {
  Phaser.Group.call(this, game); 

  this.width = width;
  this.height = height;	
  this.lighting = lighting

  this.buildWall(game, 0, 0, 			THICKNESS, height);
  this.buildWall(game, 0, 0, 			width, THICKNESS);
  this.buildWall(game, 0, height - 3, 	width, THICKNESS);
  this.buildWall(game, width- 3, 0, 	THICKNESS, height);
};

Room.prototype = Object.create(Phaser.Group.prototype);
Room.prototype.constructor = Room;

Room.prototype.update = function() {
  
};

Room.prototype.buildWall = function(game, roomX, roomY, width, height) {
  this.wall = new Wall(game, roomX, roomY, width, height);
  this.add(this.wall);
};

module.exports = Room;
