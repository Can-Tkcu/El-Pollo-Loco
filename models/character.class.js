class Character extends MovableObject {
  speed = 8;
  world;
  isIdle = false;
  cache = new CharCache();
  sounds = new Sounds();


  offset = {
    top: 150,
    bottom: -5,
    left: 20,
    right: 20,
  };


  constructor() {
    super();
    this.loadImage(this.cache.IMAGES_IDLE[0]);
    this.loadImages(this.cache.IMAGES_WALKING); // Loads images before they can be used!
    this.loadImages(this.cache.IMAGES_JUMPING);
    this.loadImages(this.cache.IMAGES_IDLE);
    this.loadImages(this.cache.IMAGES_LONG_IDLE);
    this.loadImages(this.cache.IMAGES_HURT);
    this.loadImages(this.cache.IMAGES_DEAD);
    this.animate();
    this.animations();
    this.applyGravity();
    this.sounds.setVolume();
  }


  /**
   * responsible for checking the character animations 
   */
  animate() {
    setInterval(() => {
      this.movingRight();
      this.movingLeft();
      this.jumping();
      this.throwing();
      this.playerCamera();
      this.deathAnimation();
      this.sounds.setSound();
    }, 1000 / 60);
  }


  /**
   * holds all movement anims
   */
  animations() {
    this.walkAnimation();
    this.jumpAnimation();
    this.idleAnimation();
    this.longIdleAnimation();
  }


  /**
   * follow character, acts as the camera 
   */
  playerCamera() {
    this.world.camera_x = -this.x + 100;
  }


  /**
   * stops the longIdle anim
   * @function
   * @param {Boolean} isIdle - set to false by default.
   */
  stopIdle() {
    this.isIdle = false;
    clearTimeout(this.timer);
    this.applyTime();
  }


  /**
 * Perform jump, stop idle animation and play jumping sound when up arrow key is pressed, 
 * object is not above ground, and not hurt
 *
 * @function
 */
  jumping() {
    if (this.world.keyboard.UP && !this.isAboveGround() && !this.isHurt()) {
      this.jump();
      this.stopIdle();
      this.sounds.jumping_sound.play();
    }
  }


  /**
 * Stop idle animation when "F" key is pressed, as long as the object is not dead.
 *
 * @function
 */
  throwing() {
    if (this.world.keyboard.F && !this.isDead()) {
      this.stopIdle();
    }
  }


  /**
 * Move object left, set otherDirection to true, stop idle animation, and play walking sound if left arrow key is pressed, 
 * object is not at the end of the level, and is not dead
 *
 * @function
 * @param {Boolean} otherDirection - set to false by default, depending on this bool the img of the character gets flipped.
 * 
 */
  movingLeft() {
    if (this.world.keyboard.LEFT && this.x > -850 && !this.isDead()) {
      this.moveLeft();
      this.otherDirection = true;
      this.stopIdle();
      this.sounds.walking_sound.play();
    }
  }


  /**
 * Move object right, set otherDirection to false, stop idle animation, and play walking sound if right arrow key is pressed, 
 * object is not at the end of the level, and is not dead
 *
 * @function
 * @param {Boolean} otherDirection - set to false by default, depending on this bool the img of the character gets flipped.
 * 
 */
  movingRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
      this.moveRight();
      this.otherDirection = false;
      this.stopIdle();
      this.sounds.walking_sound.play();
    }
  }


  /**
 * Play death or hurt animation if the object is dead or hurt, respectively.
 * Perform actions like playing sound and setting gameEnd flag.
 * @function
 * @param {Boolean} gameEnd - set to false by default.
 */
  deathAnimation() {
    if (this.isDead()) {
      this.y += 20;
      this.playAnimation(this.cache.IMAGES_DEAD);
      this.sounds.pepe_death_sound.play();
      this.gameEnd = true;
    } else if (this.isHurt()) {
      this.stopIdle();
      this.sounds.hurt_sound.play();
      this.playAnimation(this.cache.IMAGES_HURT);
    }
  }


  /**
 * Play jump animation if the object is above ground
 *
 * @function
 * 
 */
  jumpAnimation() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.cache.IMAGES_JUMPING);
      }
    }, 100);
  }


  /**
 * Play walk animation if the object is not above ground, moving, not hurt and the game end is not reached
 * @function
 * @param {Boolean} gameEnd - set to false by default.
 */
  walkAnimation() {
    setInterval(() => {
      if (!this.isAboveGround() && this.isMoving() && !this.isHurt() && this.gameEnd == false) {
        this.playAnimation(this.cache.IMAGES_WALKING);
      }
    }, 60);
  }


  /**
 * Play Longidle animation if the object is idle for 3seconds, not moving or above ground.
 * @function
 * @param {Boolean} isIdle - set to false by deafult.
 */
  longIdleAnimation() {
    setInterval(() => {
      if (this.isIdle == true && !this.isMoving() && !this.isAboveGround()) {
        this.playAnimation(this.cache.IMAGES_LONG_IDLE);
      }
    }, 150);
  }


  /**
 * Play idle animation if the object is idle and not moving and not above ground.
 * @function
 * @param {Boolean} isIdle - set to false by deafult.
 */
  idleAnimation() {
    this.applyTime();
    setInterval(() => {
      if (this.isIdle == false && !this.isMoving() && !this.isAboveGround()) {
        this.playAnimation(this.cache.IMAGES_IDLE);
      }
    }, 150);
  }


/**
 * Sets the timer for long idle inactivity
 * @function 
 * @param {Boolean} isIdle - set to false by deafult.
 * 
 * The function is using the setTimeout function to wait 3 seconds and then set the isIdle variable to true.
 * If isIdle is already true, the function calls itself again, which will re-run the check and start the timer again.
 */
  timer;
  applyTime() {
    if (this.isIdle == false) {
      this.timer = setTimeout(() => {
        this.isIdle = true;
      }, 3000);
    } else {
      this.applyTime();
    }
  }
}