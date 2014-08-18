var game;
var on;
'use strict';

var Torch = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'torch', frame);
  this.game = game;
  this.anchor.setTo(0.5, 0.5);
  this.cursors = game.input.keyboard.createCursorKeys();
  this.alpha = 0;
  this.enabled = true;
};

Torch.prototype = Object.create(Phaser.Sprite.prototype);
Torch.prototype.constructor = Torch;

Torch.prototype.update = function() {
  
      if(this.cursors.left.isDown)
          {
              this.angle -= 5;
          } 
      else if(this.cursors.right.isDown)
          {
              this.angle += 5;
          }

};

Torch.prototype.toggle = function() {
  if(this.enabled == true){
      if(on){
        on = false
        this.alpha = 0;
      } else {
        on = true;
        this.alpha = 1;
      }
  }
}


module.exports = Torch;
