'use strict';

var Map1 = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'tiles', frame);

  
};

Map1.prototype = Object.create(Phaser.Sprite.prototype);
Map1.prototype.constructor = Map1;

Map1.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Map1;
