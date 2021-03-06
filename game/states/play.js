var Player =  require('../prefabs/man');
var Door =  require('../prefabs/door');
var Room =  require('../prefabs/room');
var Torch =  require('../prefabs/Torch');
var Alien =  require('../prefabs/alien');
var Touch =  require('../prefabs/touch');
var Crate =  require('../prefabs/crate');
var Tracker =  require('../prefabs/tracker');
var current_room;
var current_door; 
var LEVELS = 20;
var DIST = 0;
var shotTime = 0;
var torchTime = 0;
var hazeCount = 0;
var alienNinjas;
var healthTimer = 0;
var alien_blood;
var sound = 0;
var roomScore = 0;

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // start the game musio
      this.gameMusic = this.game.add.audio('gameMusic',1,true); // make it loop
      this.gameMusic2 = this.game.add.audio('gameMusic2',1,true); // make it loop
      this.gameMusic3 = this.game.add.audio('gameMusic3',1,true); // make it loop

      this.gameMusic.play('',0,1,true);
      this.gameMusic2.play('',0,1,true);
      this.gameMusic3.play('',0,1,true); 

      ground = this.game.add.tileSprite(0, 0, 0, 0, 'ground');

      alien_blood = this.game.add.emitter(0, 0, 200);
      alien_blood.makeParticles('alien_blood');
      alien_blood.gravity = 0;
      alien_blood.minParticleSpeed.set(-10, -10);
      alien_blood.maxParticleSpeed.set(10, 10);
      alien_blood.minParticleScale = 0.1;
      alien_blood.maxParticleScale = 0.5;

      // Add the player
      this.player = new Player(this.game, this.game.world.width / 2, this.game.world.height /2);
      this.game.physics.arcade.enableBody(this.player);
      this.game.add.existing(this.player);

      this.touch = new Touch(this.game, this.player.x, this.player.y)
      this.game.add.existing(this.touch);
      this.touch.alpha = 0;

      this.healthText = this.game.add.bitmapText(20, 540, 'main_font', this.player.health, 30);

      this.tracker = new Tracker(this.game, this.game.world.width / 2, this.game.world.height - 20);
      this.game.add.existing(this.tracker);

      this.ping = this.game.add.sprite(this.tracker.x, this.tracker.y, "ping");
      this.ping.width = 0;
      this.ping.height = 0;
      this.ping.anchor.setTo(0.5,0.5);

      this.radar = this.game.add.sprite(this.player.x, this.player.y, "ping");
      this.radar.anchor.setTo(0.5,0.5);
      this.radar.alpha = 0; 
      this.radar.width = 250;
      this.radar.height = 250;

      this.heartMeter = this.game.add.sprite(-285, 500, 'heartMeter' );

      this.game.physics.arcade.enable(this.radar);

      this.haze = this.game.add.tileSprite(0, 0, this.game.world.centerX, this.game.world.centerY, 'haze' );

      this.torch = new Torch(this.game, this.player.x, this.player.y )
      this.game.add.existing(this.torch);

      this.flare = this.game.add.sprite(this.player.x, this.player.y, 'flare' );
      this.flare.alpha = 0;

      this.light1 =  this.game.add.sprite(0,0, 'light1');
      this.light1.alpha = 0;

      this.black = this.game.add.sprite(0,0, 'black');
      this.black.alpha = 0;

      this.attack = this.game.add.sprite(this.game.world.centerX-200, this.game.world.centerY, 'attack');
      this.attack.anchor.setTo(0.5,0.5);
      this.attack.alpha = 0;


      this.doors = this.game.add.group();
      this.crates = this.game.add.group();
      this.aliens = this.game.add.group();
      this.alienNinjas = this.game.add.group();
      this.rooms = this.game.add.group();
      this.doors = this.game.add.group();
      this.gems = this.game.add.group();
      this.acids = this.game.add.group();

      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(10, 'shot', 0, false);      // create multiple shots
      this.bullets.setAll('anchor.x', 0.5);         // set the achor for all shots to the center of the sprite
      this.bullets.setAll('anchor.y', 1); 
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);

      this.build_Level();

      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.game.time.events.loop(Phaser.Timer.SECOND, this.pingRader, this);
      this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.pingHeart, this);
    },
    
    update: function() {

        this.game.physics.arcade.collide(this.player, current_room);
        this.game.physics.arcade.collide(this.player, this.aliens, this.poo, null, this);
        this.game.physics.arcade.collide(this.aliens, this.aliens);
        this.game.physics.arcade.collide(this.aliens, current_room);
        this.game.physics.arcade.collide(this.player, this.crates);
        this.game.physics.arcade.overlap(this.aliens, this.bullets, this.kill_alien, null, this);
        this.game.physics.arcade.overlap(this.crates, this.bullets, this.kill_crate, null, this);

        this.game.physics.arcade.overlap(this.player, current_door, this.new_room, null, this);
        this.game.physics.arcade.overlap(this.touch, this.aliens, this.make_hostile, null, this);
        this.game.physics.arcade.overlap(this.player, this.gems, this.update_score, null, this);

        //this.haze.angle += 0.5;

        for(var i = 0; i < this.aliens.length; i++){
          if(this.aliens.getAt(i).hostile === true){
            this.game.physics.arcade.accelerateToObject(this.aliens.getAt(i), this.player, 100, 2000, 2000);
            this.aliens.getAt(i).rotation = this.game.physics.arcade.angleBetween(this.player, this.aliens.getAt(i));
            this.aliens.getAt(i).bringToTop();
          }
        }

        this.haze.tilePosition.y += 0.3; 


        this.touch.x = this.player.x;
        this.touch.y = this.player.y;

        this.radar.x = this.player.x;
        this.radar.y = this.player.y;

        this.player.bringToTop();
        this.flare.bringToTop();

        this.torch.x = this.player.x;
        this.torch.y = this.player.y;
        this.torch.bringToTop();
        this.black.bringToTop();

        this.tracker.bringToTop();
        this.ping.bringToTop();
        this.heartMeter.bringToTop();
        this.attack.bringToTop();

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
            this.use_flare();
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.fire();
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ALT)){
            // this.torch.toggle();
            this.toggle_black();
        }

        if(healthTimer == this.game.time.now) {

        }
        if(this.attack.alpha != 0){
            this.attack.alpha -= 0.05;
        }

        this.healthText.setText("" + Math.round(this.player.health) + "");
        // this.healthText.bringToTop();
    },

    make_hostile: function(touch, alien) {
      if(alien.hostile === false){
        alien.hostile = true;
        this.sound = this.game.sound.play('hiss'); 
      }
    },

    willy: function(radar, poo){
        this.sound = this.game.sound.play('pingSound', 0.3);
    },


    poo: function(player, alien) {
        alien.body.velocity.x = 0;
        alien.body.velocity.y = 0;
        player.lose_health();

        if( player.health <= 0 ){
          this.game.state.start('gameover');
          this.game.score = this.roomScore;
        } 

        this.attack.x = this.game.rnd.integerInRange(0, this.game.world.width);
        this.attack.y = this.game.rnd.integerInRange(0, this.game.world.height);
        this.attack.alpha = 0.3;
    },

    kill_alien: function(alien, bullet) {
      alien.hurt(50);

      alien.hostile = true;
      alien_blood.x = bullet.x;
      alien_blood.y = bullet.y;
      alien_blood.start(true, 2000, null, 10);
      
      bullet.kill();

      this.sound = this.game.sound.play('alien_hit', 0.5); 

      if(alien.health <= 0){
        // this.acid = this.game.add.sprite(alien.x, alien.y, 'alien_splat');
        // this.acid.anchor.setTo(0.5,0.5);
        // this.acids.add(this.acid);
        alien.removeFromGame();
        this.sound = this.game.sound.play('splat', 0.2); 
      }
    },

    kill_crate: function(crate, bullet) {
      var chance = this.game.rnd.integerInRange(0, 10)
      crate.hurt();
      this.sound = this.game.sound.play('wood'); 
      bullet.kill();
      if(crate.health == 0){
        crate.kill();
        if(chance == 1 ){
          this.place_item(crate.x, crate.y);
        }
        crate.kill();
        this.sound = this.game.sound.play('break'); 
      }
    },

    update_score: function(player, gem){
      gem.kill();
      player.gain_health_small();
    },

    clickListener: function() {
      this.game.state.start('gameover');
    },

    place_item: function(x,y) {
      this.gem =  this.game.add.sprite(x,y, 'gem');
      this.gem.anchor.setTo(0.5,0.5);
      this.game.physics.arcade.enableBody(this.gem);
      this.gems.add(this.gem);
    },

    use_flare: function() {
      this.flare.width = current_room.width;
      this.flare.height = current_room.height;
      this.flare.x = current_room.x;
      this.flare.y = current_room.y;

      this.game.add.tween(this.torch).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.flare).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.remove_flare, this);
    },

    remove_flare: function() {
      this.game.add.tween(this.torch).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
      this.game.add.tween(this.flare).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
    },

    pingRader: function() {
      this.ping.width = 0;
      this.ping.height = 0;
      this.ping.alpha = 0.5;
      this.sound = this.game.sound.play('blip', 0.3);
      this.game.add.tween(this.ping).to({width: 310, height: 310}, 500, Phaser.Easing.Linear.None, true)
      .to({alpha: 0 }, 100, Phaser.Easing.Linear.None)
      this.game.physics.arcade.overlap(this.radar, this.aliens, this.willy, null, this);
    },

    pingHeart: function() {
      this.heartMeter.alpha = 0.5;
      this.heartMeter.x = -285;
      this.game.add.tween(this.heartMeter).to({x: -0}, 50, Phaser.Easing.Linear.None, true)
      .to({alpha: 0}, 1500, Phaser.Easing.Linear.None)
    },

    render: function() {

        // this.game.debug.spriteInfo(this.touch, 32, 32);
        // this.game.debug.body(this.aliens);
        // this.game.debug.body(current_door);
        // this.game.debug.body(this.radar);

    },

    build_Level: function() {
      for(var i = 0; i < LEVELS; i++){
        this.build_a_room(i);
      }
      this.start_game();

      //.getAt(i)
    },

    build_a_room: function(room_number) {
      // create a new room
      this.room = new Room(this.game, (this.game.rnd.integerInRange(1, 5) * 100), (this.game.rnd.integerInRange(1, 5) * 100), this.game.rnd.integerInRange(0, 3));
      
      // move it to the center
      this.room.x = (this.game.world.width / 2) - (this.room.width / 2);
      this.room.y = (this.game.world.height / 2) - (this.room.height / 2);
      
      //set the rooms as invisible to start with 
      this.room.visible = false;

      //set the door position for the room
      this.room.doorX = this.game.rnd.integerInRange(this.room.x, (this.room.x + this.room.width - 50))
      this.room.doorY = this.game.rnd.integerInRange(this.room.y, (this.room.y + this.room.height - 50))

      this.door = new Door(this.game, this.room.doorX, this.room.doorY);
      this.door.going_to = room_number + 1;
      this.door.belongs_to = room_number;
      this.door.visible = false;

      this.doors.add(this.door);
      this.rooms.add(this.room);
    },

    start_game: function() {
      current_room = this.rooms.getFirstAlive()
      current_door = this.doors.getAt(0);
      current_door.visible = true;
      current_room.visible = true;

      ground.width = current_room.width;
      ground.height = current_room.height;
      ground.x = current_room.x;
      ground.y = current_room.y;

      this.add_aliens(current_room.x, current_room.y, current_room.width, current_room.height);
      this.add_crates(current_room.x, current_room.y, current_room.width, current_room.height);;

      this.haze.width = current_room.width;
      this.haze.height = current_room.height;
      this.haze.x = current_room.x;
      this.haze.y = current_room.y;

      this.lighting(current_room.lighting);
    },

    lighting: function(lighting) {
        switch(lighting) {
            case 0:
                this.flashy();
                break;
            case 1:
                this.pitchBlack();
                break;
            case 2:
                this.bright();
                break;
            case 3:
                this.bright();
                break;
        }
    },

    flashy: function() {
        this.torch.enabled = false;
        this.torch.alpha = 0;

        this.black.width = current_room.width;
        this.black.height = current_room.height;
        this.black.x = current_room.x;
        this.black.y = current_room.y;
        this.black.alpha = 0;

        this.flare.width = current_room.width;
        this.flare.height = current_room.height;
        this.flare.x = current_room.x;
        this.flare.y = current_room.y;
        this.flare.alpha = 1;

        if(this.flashy_timer){
          this.game.time.events.remove(this.flashy_timer);
        }
        this.flashy_timer = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.update_flash, this);
    },

    update_flash: function() {
        this.game.add.tween(this.black).to({alpha: 1}, 700, Phaser.Easing.Linear.None, true)
        .to({alpha: 0.2 }, 500, Phaser.Easing.Linear.None)
    },

    pitchBlack: function() {
        this.black.alpha = 0;
        this.torch.enabled = true;
        this.torch.alpha = 1;

        if(this.flashy_timer){
          this.game.time.events.remove(this.flashy_timer);
        }
        this.flare.alpha = 0;
    },

    toggle_black: function() {
      if (this.game.time.now > torchTime)
        {
        if(this.black.alpha > 0.5){
          this.black.alpha = 0;
        } else {
          this.black.alpha = 1;
        }
        torchTime = this.game.time.now + 400;
      }
    },

    stuttery: function() {

    },

    bright: function() {
      this.black.alpha = 0;
      this.torch.alpha = 0;
      this.flare.alpha = 0;
      if(this.flashy_timer){
          this.game.time.events.remove(this.flashy_timer);
      }

    },

    fire: function() {
        if (this.game.time.now > shotTime)
        {
              this.sound = this.game.sound.play('shot', 0.2);

              var bullet = this.bullets.getFirstExists(false);
              if (bullet) // if there is one
              {
                bullet.reset(this.player.x, this.player.y);
                this.player.bringToTop();
 
                bullet.rotation = this.player.rotation;
                this.game.physics.arcade.velocityFromRotation(this.player.rotation, 400, bullet.body.velocity);
              }

        shotTime = this.game.time.now + 400;
        }
    },

    new_room: function(player, door) {
      this.game.score++;
      var new_room = door.going_to;

        current_room.visible = false;
        current_door.visible = false;

        current_room = this.rooms.getAt(new_room);
        current_door = this.doors.getAt(new_room);

        this.add_aliens(current_room.x, current_room.y, current_room.width, current_room.height);

        ground.width = current_room.width;
        ground.height = current_room.height;
        ground.x = current_room.x;
        ground.y = current_room.y;

        this.haze.width = current_room.width;
        this.haze.height = current_room.height;
        this.haze.x = current_room.x;
        this.haze.y = current_room.y;

        current_room.visible = true;
        current_door.visible = true;

        current_room.alpha = 0 ;
        current_door.alpha = 0 ;
        ground.alpha = 0


        this.game.add.tween(current_room).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(current_door).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(ground).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
      
      if(new_room == LEVELS){


      } 
      else 
      {
        this.player.x =  current_room.x + 50;
        this.player.y =  current_room.y + 50;
        this.touch.x = this.player.x;
        this.touch.y = this.player.y;
      }

      this.add_crates(current_room.x, current_room.y, current_room.width, current_room.height);
      this.lighting(current_room.lighting);

      if(this.acids.length > 0){
          this.acids.forEach(function(acid){
            acid.kill()
          });
        }
    },

    add_aliens: function(x, y, width, height){

        if(this.aliens.length > 0){
          this.aliens.forEach(function(alien){
            alien.removeFromGame();
          });
        }
        var limit = this.game.rnd.integerInRange(0, 8);

        for(var i = 0; i < limit; i++){
          posX = this.game.rnd.integerInRange(x, (x + width - 50));
          posY = this.game.rnd.integerInRange(y, (y + height - 50));
          this.alien =  new Alien(this.game, posX, posY);
          this.aliens.add(this.alien);
        }
    },

    add_crates: function(x, y, width, height){

        if(this.crates.length > 0){
          this.crates.removeAll()
        }
        var limit = this.game.rnd.integerInRange(0, 10);

        for(var i = 0; i < limit; i++){
          posX = this.game.rnd.integerInRange(x+25, (x + width - 25));
          posY = this.game.rnd.integerInRange(y+25, (y + height - 25));

          if(
              ( 
              posX > current_door.x - 10 && 
              posX < (current_door.x + current_door.width + 10) && 
              posY > current_door.y - 10 && 
              posY < (current_door.y + current_door.height + 10)
              ) 
              ||
              (
              posX > this.player.x -25 &&
              posX < (this.player.x + this.player.width + 25) &&
              posY > this.player.y - 25 &&
              posY < (this.player.y + this.player.height + 25)
              )
            )
          {
            // do nothing
            console.log("nope");
          } 
          else 
          {
            this.crate =  new Crate(this.game, posX, posY)
            this.crates.add(this.crate);
          }
        }
    },

    shotOut: function(shot){
      shot.kill();
    },

  };
  
  module.exports = Play;