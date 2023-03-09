class Sounds {

  collect_bottle_sound = new Audio("audio/collect-bottle.mp3");
  collect_coin_sound = new Audio("audio/coin.mp3");
  throw_bottle_sound = new Audio("audio/throw.mp3");
  bottle_break_sound = new Audio("audio/bottle-break.mp3");
  chicken_hurt_sound = new Audio("audio/chicken-hurt.mp3");
  boss_dead_sound = new Audio("audio/boss-dead.mp3");
  music_sound = new Audio("audio/in-game-music.mp3");
  healing_sound = new Audio("audio/healing.mp3");
  boss_detect_sound = new Audio("audio/boss-detect.mp3");
  boss_music_sound = new Audio("audio/boss-music.mp3");
  walking_sound = new Audio("audio/walk.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  pepe_death_sound = new Audio("audio/pepe-death.mp3");


/**
 * volume is manually set because original files are too loud 
 */
  setVolume() {
    this.boss_music_sound.volume = 0.1;
    this.music_sound.volume = 0.1;
    this.collect_bottle_sound.volume = 0.1;
    this.throw_bottle_sound.volume = 0.1;
    this.collect_coin_sound.volume = 0.1;
    this.bottle_break_sound.volume = 0.1;
    this.chicken_hurt_sound.volume = 0.1;
    this.boss_dead_sound.volume = 0.1;
    this.healing_sound.volume = 0.1;
    this.boss_detect_sound.volume = 0.1;
    this.walking_sound.volume = 0.3;
    this.jumping_sound.volume = 0.1;
    this.hurt_sound.volume = 0.1;
    this.pepe_death_sound.volume = 0.1;
  }


  /**
   * stops sounds
   */
  stopSounds() {
    this.collect_bottle_sound.volume = 0.0;
    this.throw_bottle_sound.volume = 0.0;
    this.collect_coin_sound.volume = 0.0;
    this.bottle_break_sound.volume = 0.0;
    this.chicken_hurt_sound.volume = 0.0;
    this.boss_dead_sound.volume = 0.0;
    this.healing_sound.volume = 0.0;
    this.boss_detect_sound.volume = 0.0;
    this.walking_sound.volume = 0.0;
    this.jumping_sound.volume = 0.0;
    this.hurt_sound.volume = 0.0;
    this.pepe_death_sound.volume = 0.0;
  }

  
  /**
   * stops sound when sound variable is set to true
   * @function
   * @param {Boolean} sound - set to true by default.
   */
  setSound() {
    if (sound == true) {
        this.setVolume();
      } else {
        this.stopSounds();
      }
  }
}
