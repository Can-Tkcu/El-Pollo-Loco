class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  speedX = 0;
  acceleration = 3.5;
  otherDirection = false;
  health = 100;
  lastHit = 0;

  
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };


/**
 * Determine if the current object is colliding with another object.
 * @param {Object} obj - The other object to check for collision against.
 * @returns {boolean} - True if the current object is colliding with the other object. False otherwise.
 */
  isColliding(obj) {
    return (
      this.rightBorderCollision(obj) && //Right border collides with Left border
      this.topBorderCollision(obj) && // Top border collides with bottom border
      this.leftBorderCollision(obj) && // Left border collides with Right border
      this.bottomBorderCollision(obj) // Bottom border collides with Top border
    ); 
  }


  /**
 * Determine if the right border of the current object is colliding with the left border of another object.
 * @param {Object} obj - The other object to check for collision against.
 * 
 * @returns {boolean} - - `true` if the right border is colliding with the left border, `false` otherwise.
 */
  rightBorderCollision(obj) {
    return this.x + this.width - this.offset.right > obj.x + obj.offset.left;
  }


  /**
 * Determines if the top border of the current object is colliding with the bottom border of the given object.
 * @param {Object} obj - The object to check for a collision with.
 *
 * @returns {boolean} - `true` if the top border is colliding with the bottom border, `false` otherwise.
 */
  topBorderCollision(obj) {
    return this.y + this.height - this.offset.bottom > obj.y + obj.offset.top;
  }


  /**
 * Determines if the left border of the current object is colliding with the right border of the given object.
 * @param {Object} obj - The object to check for a collision with.
 *
 * @returns {boolean} - `true` if the left border is colliding with the right border, `false` otherwise.
 */
  leftBorderCollision(obj) {
    return this.x + this.offset.left < obj.x + obj.width - obj.offset.right;
  }


  /**
 * Determines if the bottom border of the current object is colliding with the top border of the given object.
 * @param {Object} obj - The object to check for a collision with.
 *
 * @returns {boolean} - `true` if the bottom border is colliding with the top border, `false` otherwise.
 */
  bottomBorderCollision(obj) {
    return this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
  }


  /**
 * Plays an animation by displaying a series of images in sequence.
 * @param {Array} images - An array of image paths to be displayed in the animation.
 */
  playAnimation(images) {
    let i = this.currentImage % images.length; // i = 0 % 6  | Rest 0
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


/**
 * entity moves right
 */
  moveRight() {
    this.x += this.speed;
  }


/**
 * entity moves left
 */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
 * Determines whether the character is above ground.
 * @returns {boolean} `true` if the character is above ground, `false` otherwise.
 */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // throwable objects will always fall
      return true;
    } else {
      return this.y < 140;
    }
  }


  /**
 * Check if the chicken is on ground.
 * @returns {boolean} `true` if the chicken is on ground, `false` if the chicken is above ground.
 */
  chickenIsOnGround() {
    return this.y == 350;
  }


  /**
 * Check if the character is moving.
 * @returns {boolean} `true` if the characrer is moving, `false` if the character is not moving.
 */
  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }


/**
 * Inflict damage on the character or endboss.
 * @param {number} damage - The amount of damage to inflict.
 */
  hit(damage) {
    if (this.health > 0) {
      this.health -= damage;
      this.isHurt();
      this.lastHit = performance.now();
    }
  }


  /**
 * Check if the entity is dead.
 * @returns {boolean} `true` if the chicken is dead, `false` if the chicken is alive.
 */
  isDead() {
    return this.health <= 0;
  }


  /**
 * Check if the entity is in a hurt state.
 * @returns {boolean} `true` if the entitiy is in a hurt state, `false` if the entity is not in a hurt state.
 */
  isHurt() {
    let timepassed = performance.now() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000;
    return timepassed < 0.3;
  }


  /**
 * Apply gravity to the Character.
 */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }


  /**
 * Apply gravity to the BabyChicken.
 */
  applyChickenGravity() {
    setInterval(() => {
      if (this.y < 330 || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }


  /**
 * Perform a jump.
 * @returns {number} The speed of the jump.
 */
  jump() {
    return (this.speedY = 35);
  }
}