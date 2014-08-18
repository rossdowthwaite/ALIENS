'use strict';

var Tracker = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'tracker', frame);

  this.width = 300;
  this.height = 300;
  this.anchor.setTo(0.5, 0.5);
 	 // initialize your prefab here
  this.cursors = game.input.keyboard.createCursorKeys();
  
};

Tracker.prototype = Object.create(Phaser.Sprite.prototype);
Tracker.prototype.constructor = Tracker;

Tracker.prototype.update = function() {
  
        if(this.cursors.left.isDown)
          {
              this.angle -= 5;
          } 
      else if(this.cursors.right.isDown)
          {
              this.angle += 5;
          }
  
};

module.exports = Tracker;
