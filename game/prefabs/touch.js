'use strict';
var currentSpeed = 0;
var Touch = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'touch', frame);
  this.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enableBody(this);

  this.cursors = game.input.keyboard.createCursorKeys();
};


Touch.prototype = Object.create(Phaser.Sprite.prototype);
Touch.prototype.constructor = Touch;

Touch.prototype.update = function() {

	  currentSpeed = 0;
  	  
  	  if(this.cursors.left.isDown)
          {
              this.angle -= 3;
              this.body.reset(this.x, this.y);
          } 
      else if(this.cursors.right.isDown)
          {
              this.angle += 3;
          }

          this.game.physics.arcade.velocityFromRotation(this.rotation, currentSpeed, this.body.velocity);
};

module.exports = Touch;
