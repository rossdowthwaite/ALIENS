'use strict';
var currentSpeed = 0;
var points = 0; 
var ammo = 100;
var flare = 3;
var shoot
var health = 100;

var Man = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'dude', frame);

  //  We need to enable physics on the player
  this.game = game
  game.physics.arcade.enableBody(this);
  this.anchor.setTo(0.5, 0.5);
  this.body.collideWorldBounds = true;
  this.body.width = this.body.width/2;
  this.body.height = this.body.height/2;

  this.health = 100;

  this.animations.add('walk', [0, 1, 2], 6, true);
  this.animations.add('shoot', [1, 3], 20, true);

  shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)


  this.cursors = game.input.keyboard.createCursorKeys();
};

Man.prototype = Object.create(Phaser.Sprite.prototype);
Man.prototype.constructor = Man;

Man.prototype.update = function() {

      currentSpeed = 0;

      if(this.cursors.left.isDown)
          {
              this.angle -= 5;
              this.body.angle -=5;
          } 
      else if(this.cursors.right.isDown)
          {
              this.angle += 5;
          }

      if (this.cursors.up.isDown)
          {
            //  The speed we'll travel at
            currentSpeed = 75;
              this.animations.play('walk');
          }
      else if(this.cursors.down.isDown)
          {
              currentSpeed = -75;
              this.animations.play('walk');
          }
      else
      {
        this.animations.stop();
        this.frame = 1;
      }

      if(shoot.isDown){
            this.animations.play('shoot');
            console.log("po");
      }

        this.game.physics.arcade.velocityFromRotation(this.rotation, currentSpeed, this.body.velocity);
};

Man.prototype.lose_health = function() {
    this.health -= 0.1;
}

Man.prototype.gain_health_small = function() {
    this.health += 10;
    if(this.health > 100){
      this.health = 100;
    }
};

Man.prototype.gain_health_large = function() {
    health += 20;
    if(health > 100){
      health = 100;
    }
};

Man.prototype.reduce_ammo = function() {
    ammo -= 1;
};

Man.prototype.reduce_flare = function() {
    ammo -= 1;
};

Man.prototype.gain_ammo = function() {
    ammo += 20;
};

Man.prototype.gain_flare = function() {
    ammo += 20;
};

Man.prototype.add_score = function() {
    ammo += 20;
};

module.exports = Man;
