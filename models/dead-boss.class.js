class DeadBoss extends MovableObject {
  trigger = false;


  IMAGES_DEAD_BOSS = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];


  constructor(x, y) {
    super().loadImage(this.IMAGES_DEAD_BOSS[0]);
    this.loadImages(this.IMAGES_DEAD_BOSS);
    this.x = x;
    this.y = y;
    this.height = 300;
    this.width = 300;
    this.deathAnimation();
  }


  /**
   * @function
   * plays the death animation of the boss when its dead.
   */
  deathAnim;
  deathAnimation() {
    this.deathAnim = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD_BOSS);
      this.endAnim();
    }, 70);
  }


  /**
   * @function
   * stops the deathanimation and moves the boss to its final position
   */
  endAnim() {
    setTimeout(() => {
      clearInterval(this.deathAnim);
      this.y += 80;
      this.gameRestarts();
    }, 150);
  }

  
  /**
   * @function
   * restart game when boss dies
   */
  gameRestarts() {
    setTimeout(() => {
      window.location.reload();
    }, 6000);
  }
}
