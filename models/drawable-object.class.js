class DrawableObject {
  x = 0;
  y = 45;
  img;
  width = 150;
  height = 290;
  imageCache = {};
  currentImage = 0;
  gameEnd = false;


  /**
 * This function updates the healthbar by returning a numerical value
 * @function
 * @param {Number} percentage - a value between 0 and 100 representing the current health of the object
 * @return {Number} a number between 0 and 5, representing the health status of the object
 * it is worth noting that the numbers 0-5 dictate which img will be displayed in the Statusbar objects.
 */
  updateHealthbar() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }


  /**
   * Sets the statusbars of the character and endboss accordingly.
   * @function
   * @param {number} percentage 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    if (this instanceof Statusbar) {
      let path = this.IMAGES_CHAR[this.updateHealthbar()];
      this.img = this.imageCache[path];
    } else if (this instanceof StatusBarBoss) {
      let path = this.IMAGES_BOSS[this.updateHealthbar()];
      this.img = this.imageCache[path];
    }
  }


  /**
   * This function loads the Images into the Image cache 
   * @param {Array} arr 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * This function loads the Images into the Image cache 
   * @param {Array} arr 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  /**
   * Main draw function.
   *@function
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * @function
   * draws Coin and Bottle numbers and displays them on the HUD 
   */
  drawCollectedItems(ctx) {
    (ctx.font = "40px zabars"), "40px Arial", "40px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(this.statusBarBottle.collectedBottle, 340, 55);
    ctx.fillText(this.statusBarCoin.collectedCoins, 426, 55);
  }


  /**
   * only draws visible area on canvas and saves performance doing so.
   * @function
   */
  onlyDrawCanvas() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.clip();
  }

  
  /**
   * draws game and updates frames.
   * @function
   */
  gameLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLevel();
    this.drawFixedObjects();
    this.drawMovableObjects();
    this.requestFrame();
    this.ctx.restore();
  }


  /**
   * Draws map and all asssets
   * @function 
   */
  drawLevel() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.hearts);
    this.addObjectsToMap(this.level.bottles);
    this.ctx.translate(-this.camera_x, 0);
  }


  /**
   * Draws all static Objects on the map
   * @function
   */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    if (this.level.endboss.length >= 1 && this.level.endboss[0].trigger == true) {
      this.addToMap(this.statusBarBoss);
      this.addToMap(this.statusBarOverlay);
    }
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
  }


  /**
   * Draws all the Object that move or have the ability to. 
   * @function
   */
  drawMovableObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.deadEnemies);
    this.addObjectsToMap(this.deadBoss);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.smallEnemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.launchedBottle);
    this.addObjectsToMap(this.end);
    this.ctx.translate(-this.camera_x, 0);
    this.drawCollectedItems(this.ctx);
  }


  /**
   * Requests a new frame for the draw function to be called.
   * @function
   */
  requestFrame() {
    requestAnimationFrame(() => {
      this.draw();
    });
  }


  /**
   * Adds an array of objects to the map.
   * @function
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }


  /**
   * Adds a movable object to the map.
   * @function
   * @param {Object} mo - The movable object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection || mo == this.statusBarBoss) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection || mo == this.statusBarBoss) {
      this.flipImageBack(mo);
    }
  }


  /**
   * Flips an image horizontally.
   * @function
   * @param {Object} mo - The object whose image should be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }


  /**
   * Flips an image back to its original orientation after it has been horizontally flipped.
   * @function
   * @param {Object} mo - The object whose image should be flipped back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
