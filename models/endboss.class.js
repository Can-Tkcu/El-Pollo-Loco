class Endboss extends MovableObject {
  cache = new BossCache();
  height = 500;
  width = 300;
  speed = 7;
  y = -30;
  world;
  trigger = false;
  attack = false;


  offset = {
    top: 100,
    bottom: 15,
    left: 50,
    right: 50,
  };


  constructor() {
    super();
    this.loadImage(this.cache.IMAGES_ALERT[0]);
    this.loadImages(this.cache.IMAGES_ALERT);
    this.loadImages(this.cache.IMAGES_HURT);
    this.loadImages(this.cache.IMAGES_WALKING);
    this.loadImages(this.cache.IMAGES_ATTACK);
    this.x = 7400;
    this.updateTrigger();
  }


  /**
   * @function 
   * runs all the animations with an interval 
   */
  animate() {
    setInterval(() => {
      this.bossMovesTowardsChar();
      this.bossDetectsChar();
      this.bossAttacks();
      this.bossIsHurt();
    }, 200);
  }


  /**
* This function updates the trigger and triggers movement and animation
* @function
* @param {Boolean} trigger - check if movement is triggered
* @param {Boolean} attack - check if attack is false
*/
  updateTrigger() {
    setInterval(() => {
      if (this.trigger == true && this.attack == false) this.moveLeft();
    }, 1000 / 60);
    this.animate();
  }

  
  /**
* This function triggers the boss movement towards character
* @function
* @param {Boolean} trigger - check if movement towards character is triggered
* @param {Boolean} attack - check if attack is false
*/
  bossMovesTowardsChar() {
    if (this.trigger == true && this.attack == false && !this.isHurt()) {
      this.playAnimation(this.cache.IMAGES_WALKING);
    }
  }


  /**
 * This function triggers the boss attack animation and resets the attack variable after half a second.
 * @function
 * @param {Array} IMAGES_ATTACK - array of images to animate
 * @param {Boolean} attack - check if attack is true
 */
  bossAttacks() {
    if (this.attack == true) {
      setTimeout(() => {
        this.attack = false;
      }, 500);
      this.playAnimation(this.cache.IMAGES_ATTACK);
    }
  }


  /**
 * checks if the boss has detected the player and if not it plays the alert animation for the boss.
 * 
 * @function
 * @param {Array} IMAGES_ALERT - array of images to animate
 * @param {boolean} trigger is set to false.
 * @param {boolean} attack is set to false.
 */
  bossDetectsChar() {
    if (!this.attack == true && this.trigger == false) {
      this.playAnimation(this.cache.IMAGES_ALERT);
    }
  }


  /**
 * Checks if the boss is hurt and if so, plays the animation of the hurt state.
 * 
 * @function
 * @param {Array} IMAGES_HURT - array of images to animate
 * @this {MovableObject} - isHurt method inherited from MovableObject.
 */
  bossIsHurt() {
    if (this.isHurt()) {
      this.playAnimation(this.cache.IMAGES_HURT);
    }
  }
}