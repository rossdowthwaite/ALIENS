
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.game.load.bitmapFont('main_font', 'assets/fonts2/font.png', 'assets/fonts2/font.fnt');

    this.game.load.spritesheet('dude', 'assets/marine_sheet2.png', 48, 46);

    // Load the tilemap
    this.game.load.tilemap('map1', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
    // Load the tiles
    this.game.load.image('tiles1', 'assets/tiles.png');


    this.game.load.image('haze', 'assets/haze.png');
    this.game.load.image('flash', 'assets/gunFlash.png');

    // Load the tilemap
    this.game.load.tilemap('map2', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);
    // Load the tiles
    this.game.load.image('tiles2', 'assets/tiles.png')
    // Load the tiles
    this.game.load.image('door', 'assets/door.png')

    this.game.load.image('torch', 'assets/torch_mask3.png')

    this.game.load.image('flare', 'assets/flare.png')

    this.game.load.image('intro', 'assets/intro.png')

    this.game.load.image('crate', 'assets/crate.png')


    this.game.load.image('shot', 'assets/bullet.png'); 

    // backgoruns
    this.game.load.image('ground', 'assets/ground.jpeg');

    this.game.load.image('alien', 'assets/alien1.png')
    this.game.load.spritesheet('alien', 'assets/alien2.png', 40, 42);

    this.game.load.image("touch", 'assets/touch.jpg');

    this.game.load.image("gem", 'assets/health.png');
    this.game.load.image("alien_blood", 'assets/alien_blood.png');
    this.game.load.image("alien_splat", 'assets/alien_splat.png');

    this.game.load.image("black", 'assets/black.jpg');


    this.game.load.image("tracker", 'assets/MotionTracker.png');
    this.game.load.image("ping", 'assets/MotionTrackerPing.png');
    this.game.load.image("heartMeter", 'assets/heartMeter1.png');
    this.game.load.image("attack", 'assets/alien_attack.png');


    this.game.load.audio('gameMusic', ['assets/tense.wav', 'assets/tense.wav']);
    this.game.load.audio('gameMusic2', ['assets/tense2.wav', 'assets/tense2.wav']);
    this.game.load.audio('alien_die', ['assets/hiss.wav', 'assets/hiss.wav']);
    this.game.load.audio('shot', ['assets/pulseFire2.mp3', 'assets/pulseFire2.mp3']);
    this.game.load.audio('wood', ['assets/wood.wav', 'assets/wood.wav']);
    this.game.load.audio('break', ['assets/break.wav', 'assets/break.wav']);
    this.game.load.audio('hiss', ['assets/pain.wav', 'assets/pain.wav']);
    this.game.load.audio('crunch', ['assets/crunch.wav', 'assets/crunch.wav']);
    this.game.load.audio('alien_hit', ['assets/alien_hit.wav', 'assets/alien_hit.wav']);
    this.game.load.audio('pingSound', ['assets/pingSound.wav', 'assets/pingSound.wav']);
    this.game.load.audio('blip', ['assets/blip.wav', 'assets/blip.wav']);
    this.game.load.audio('splat', ['assets/splat.wav', 'assets/splat.wav']);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
