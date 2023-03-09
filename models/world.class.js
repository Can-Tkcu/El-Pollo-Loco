class World extends DrawableObject {
  character = new Character();
  sounds = new Sounds();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  statusBarBoss = new StatusBarBoss();
  statusBarOverlay = new Overlay();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  deadEnemies = [];
  deadBoss = [];
  throwableObjects = [];
  launchedBottle = [];
  end = [];
  lastThrow = 0;


  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.initGame();
    this.setWorld();
    this.sounds.setVolume();
  }

  
  /**
 * initializes the game.
 * @function
 */
  initGame() {
    this.draw();
    this.run();
  }


 /**
 * draws the game.
 */
  draw() {
    this.onlyDrawCanvas();
    this.gameLoop();
  }


  /**
 * Runs the game.
 */
  run() {
    setInterval(() => {
      this.hitDetection();
    }, 100);
    setInterval(() => {
      this.gameLogic(), this.stopMusic();
    }, 300);
  }


  /**
 * Check for and handle collisions and other events that can cause damage or other effects.
 */
  hitDetection() {
    this.checkEntityCollisions();
    this.checkDeathByJump();
    this.checkItemCollisions();
    this.checkBottleCollisions();
    this.checkThrowableObjects();
  }


  /**
 * Handle the game logic.
 */
  gameLogic() {
    let gameIsOver = new GameOver("img/9_intro_outro_screens/game_over/game over.png", this.characterPos());
    this.handleBossTrigger();
    this.showEndScren(gameIsOver);
    this.sounds.setSound();
    
    if (this.character.gameEnd == true) {
      setTimeout(() => {
          window.location.reload();
      }, 3000);
    }
  }


  /**
 * Check for and handle the throwing of throwable objects.
 */
  checkThrowableObjects() {
    const throwable = this.keyboard.F && !this.character.otherDirection ? this.canBeLaunched() : false;
    if (throwable) {
      const bottle = new ThrowableObject(this.characterPos() + 100, this.character.y + 100);
      if (this.canThrow() && this.character.health > 0 || this.statusBarBottle.collectedBottle.length <= 0) {
        this.throwableObjects.push(bottle);
        this.lastThrow = performance.now();
        this.statusBarBottle.collectedBottle--;
        this.sounds.throw_bottle_sound.play();
      }
    }
  }


  /**
 * Show the end screen.
 * @param {boolean} gameIsOver - A boolean value indicating if the game is over.
 */
  showEndScren(gameIsOver) {
    if (this.character.health <= 0 || this.gameEnd == true) {
      if (this.end.length <= 0) {
        this.end.push(gameIsOver);
        this.characterStops();
      }
    }
  }


  /**
 * Handle the boss trigger event.
 */
  handleBossTrigger() {
    if (this.bossIsAlive()) {
      this.playerGetsDetected();
      this.playBossMusic();
      this.bossBecomesWall();
    }
  }


  /**
   * plays endboss music
   */
  playBossMusic() {
    if (music == true) {
      if (this.level.endboss[0].trigger == true) {
        this.sounds.music_sound.pause();
        this.sounds.boss_music_sound.play();
      } else {
        this.sounds.music_sound.play();
      }
    }
  }


  /**
 * Makes the boss become an obstacle that the character cannot pass through.
 */
  bossBecomesWall() {
    if (this.level.endboss[0].x <= this.characterPos()) {
      this.level.level_end_x = this.level.endboss[0].x;
    }
  }


  /**
 * Handle the player being detected by the boss.
 */
  playerGetsDetected() {
    if (this.characterPos() > 6600) {
      this.sounds.boss_detect_sound.play();
      this.level.endboss[0].trigger = true;
    }
  }


  /**
   * stops music
   */
  stopMusic() {
    if (music == false) {
      this.sounds.music_sound.pause();
      this.sounds.boss_music_sound.pause();
    }
  }


  /**
 * Set the world for the character and endboss.
 * 
 * The `world` property is used to reference the current game instance from within the character and endboss objects. 
 * This function sets the `world` property for the character and endboss to the current game instance.
 */
  setWorld() {
    this.character.world = this;
    this.level.endboss.world = this;
  }


  /**
 * Check if a @param {ThrowableObject},can be thrown.
 * @returns {boolean} `true` if a throwable object can be thrown, `false` if a throwable object cannot be thrown.
 */
  canThrow() {
    let timepassed = performance.now() - this.lastThrow; // difference in ms
    timepassed = timepassed / 1000;
    return timepassed > 0.5;
  }


  /**
 * Check if a bottle can be launched.
 * @returns {boolean} `true` if a bottle can be launched, `false` if a bottle cannot be launched.
 */
  canBeLaunched() {
    return this.statusBarBottle.collectedBottle > 0;
  }


  /**
 * Check if the boss is alive.
 * @returns {boolean} `true` if the boss is alive, `false` if the boss is dead.
 */
  bossIsAlive() {
    return this.level.endboss.length >= 1;
  }


/**
 * stops character movement
 */
  characterStops() {
    this.character.speed = 0;
  }


/**
 * @returns - character x coordinate
 */
  characterPos() {
    return this.character.x;
  }


  /**
 * Check for kills caused by jumping on enemies, and handle them.
 * @param {Chicken} enemy - The smallEnemy object to check for collisions with the character.
 * @param {number} i - The index of the smallEnemy in the `smallEnemies` array.
 */
  checkKillByJump() {
    this.level.enemies.forEach((enemy, i) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround()) 
        this.enemyIsDead(enemy, i);
    });
  }


  /**
 * Check for kills caused by jumping on smallEnemies, and handle them.
 * @param {BabyChicken} smallEnemy - The smallEnemy object to check for collisions with the character.
 * @param {number} i - The index of the smallEnemy in the `smallEnemies` array.
 */
  checkKillByJumpBabyChicken() {
    this.level.smallEnemies.forEach((smallEnemy, i) => {
      if (this.character.isColliding(smallEnemy) && this.character.isAboveGround()) 
        this.smallEnemyIsDead(smallEnemy, i)
    });
  }


  /**
 * Handle an smallEnemy being killed.
 * @param {BabyChicken} enemy - The enemy object.
 * @param {number} i - The index of the enemy in the `enemies` array.
 */
  smallEnemyIsDead(smallEnemy, i) {
    let deadEnemy = new DeadBabyChicken(smallEnemy.x, smallEnemy.y);
    this.sounds.chicken_hurt_sound.play();
    this.deadEnemies.push(deadEnemy);
    this.level.smallEnemies.splice(i, 1);
    setTimeout(() => {
      this.deadEnemies.splice(deadEnemy);
    }, 1000);
  }


  /**
 * Handle an enemy being killed.
 * @param {Chicken} enemy - The enemy object.
 * @param {number} i - The index of the enemy in the `enemies` array.
 */
  enemyIsDead(enemy, i) {
    let deadEnemy = new DeadChicken(enemy.x, enemy.y);
    this.sounds.chicken_hurt_sound.play();
    this.deadEnemies.push(deadEnemy);
    this.level.enemies.splice(i, 1);
    setTimeout(() => {
      this.deadEnemies.splice(deadEnemy);
    }, 1000);
  }


  /**
 * Handle the splash of a bottle.
 * @param {ThrowableObject} bottlePos - The position of the bottle.
 */
  bottleIsSplashed(bottlePos) {
    let bottle = new SplashedBottle(bottlePos.x, bottlePos.y);
    this.sounds.bottle_break_sound.play();
    this.throwableObjects.splice(bottlePos, 1);
    this.launchedBottle.push(bottle);
    setTimeout(() => {
      this.launchedBottle.splice(bottle);
    }, 500);
  }


  /**
 * Handle the boss being killed.
 * @param {Object} boss - The boss object.
 * @param {number} i - The index of the boss in the `endmax` array.
 */
  bossIsDead(boss, i) {
    let deadBoss = new DeadBoss(boss.x, boss.y);
    this.sounds.boss_dead_sound.play();
    this.deadBoss.push(deadBoss);
    this.level.endboss.splice(i, 1);
    setTimeout(() => {
      this.deadBoss.splice(deadBoss);
      this.gameEnd = true;
    }, 3000);
  }


  /**
 * Handle the boss being hurt.
 * @param {Endboss} boss - The boss object.
 */
  bossIsHurt(boss) {
    boss.hit(10);
    this.sounds.chicken_hurt_sound.play();
    this.statusBarBoss.setPercentage(boss.health);
    this.bossIsAggro(boss);
  }


  /**
 * Make the boss become aggressive.
 * @param {Endboss} boss - The boss object.
 */
  bossIsAggro(boss) {
    boss.speed = 5;
    if (boss.x - this.characterPos() > 250) {
      setTimeout(() => {
        boss.speed = 15;
      }, 1000);
      setTimeout(() => {
        boss.speed = 7;
      }, 2200);
    }
  }


  /**
 * Check for collisions involving entities, and handle them.
 */
  checkEntityCollisions() {
    this.chickenCollision();
    this.smallChickenCollision();
    this.endbossCollision();
  }



  /**
 * Check for collisions involving items, and handle them.
 */
  checkItemCollisions() {
    this.coinCollision();
    this.heartCollision();
    this.bottleCollision();
  }


  /**
 * Check for deaths caused by jumping on enemies, and handle them.
 */
  checkDeathByJump() {
    this.checkKillByJump();
    this.checkKillByJumpBabyChicken();
  }


  /**
 * Check for collisions involving bottles, and handle them.
 */
  checkBottleCollisions() {

    this.bottleEnemyCollision();
    this.bottleSmallEnemyCollision();
    this.bottleEndbossCollision();
    this.bottleGroundCollision();
  }


/**
 * Check for collisions between the character and enemies, and handle them.
 * @param {Chicken} enemy - The enemy object to check for collisions with the character.
 */
  chickenCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
        this.character.hit(5);
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }


  /**
 * Check for collisions between the character and smallEnemies, and handle them.
 * @param {BabyChicken} smallEnemy - The smallEnemy object to check for collisions with the character.
 */
  smallChickenCollision() {
    this.level.smallEnemies.forEach((smallEnemy) => {
      if (this.character.isColliding(smallEnemy) && !this.character.isAboveGround()) {
        this.character.hit(5);
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }


  /**
 * Check for collisions between the character and endboss, and handle them.
 * @param {Endboss} boss - The endboss object to check for collisions with the character.
 */
  endbossCollision() {
    this.level.endboss.forEach((boss) => {
      if (this.character.isColliding(boss)) {
        this.level.endboss[0].attack = true;
        this.character.hit(15);
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }


  /**
 * Check for collisions between the character and coins, and handle them.
 * @param {Coins} coin - The coin object to check for collisions with the character.
 * @param {number} i - The index of the coin in the `coins` array.
 */
  coinCollision() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.sounds.collect_coin_sound.play();
        this.level.coins.splice(i, 1);
        this.statusBarCoin.collectedCoins++;
      }
    });
  }


  /**
 * Check for collisions between the character and hearts, and handle them.
 * @param {Heart} heart - The heart object to check for collisions with the character.
 * @param {number} i - The index of the heart in the `hearts` array.
 */
  heartCollision() {
    this.level.hearts.forEach((heart, i) => {
      if (this.character.isColliding(heart)) {
        this.sounds.healing_sound.play();
        this.level.hearts.splice(i, 1);
        this.character.health += 50;
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }


  /**
 * Check for collisions between the character and bottles, and handle them.
 * @param {SalsaBottle} bottle - The bottle object to check for collisions with the character.
 * @param {number} i - The index of the bottle in the `bottles` array.
 */
  bottleCollision() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.sounds.collect_bottle_sound.play();
        this.level.bottles.splice(i, 1);
        this.statusBarBottle.collectedBottle++;
      }
    });
  }


  /**
 * Check for collisions between bottles and enemies, and handle them.
 * @param {ThrowableObject} bottle - The bottle object to check for collisions with enemies.
 * @param {Chicken} enemy - The enemy object to check for collisions with bottles.
 * @param {number} i - The index of the enemy in the `enemies` array.
 */
  bottleEnemyCollision() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy, i) => {
        if (bottle.isColliding(enemy)) {
          this.enemyIsDead(enemy, i);
          this.bottleIsSplashed(bottle);
        }
      });
    });
  }

  
  /**
   * Bottle splashes when it hits the ground.
   * @param {ThrowableObject} bottle - the bottle object.
   */
  bottleGroundCollision() {
    this.throwableObjects.forEach((bottle) => {
        if (bottle.y >= 260) 
        this.bottleIsSplashed(bottle);
    });
  }


  /**
   * Handles collision between bottles and small enemies. Removes the small enemy from the level and adds it to the `deadEnemies` array if it is hit by a bottle.
   * @param {ThrowableObject} bottle - The bottle object.
   * @param {BabyChicken} smallEnemy - The small enemy object.
   * @param {number} i - The index of the small enemy in the `level.smallEnemies` array.
   */
  bottleSmallEnemyCollision() {
    this.throwableObjects.forEach((bottle) => {
      this.level.smallEnemies.forEach((smallEnemy, i) => {
        if (bottle.isColliding(smallEnemy)) {
          this.smallEnemyIsDead(smallEnemy, i);
          this.bottleIsSplashed(bottle);
        }
      });
    });
  }


  /**
  Check for collisions between the bottles and the end boss. If a collision occurs, the bottle is splashed and the boss is hurt.
  If the boss is dead, it is removed from the level.
*/
  bottleEndbossCollision() {
    this.throwableObjects.forEach((bottle) => {
      this.level.endboss.forEach((boss, i) => {
        if (bottle.isColliding(boss)) {
          this.bottleIsSplashed(bottle);
          this.bossIsHurt(boss, i);
          if (boss.isDead()) {
            this.bossIsDead(boss, i);
          }
        }
      });
    });
  }
}