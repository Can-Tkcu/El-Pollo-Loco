class BabyChicken extends MovableObject {
  width = 70;
  height = 70;

  
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  
  offset = {
    top: 5,
    bottom: 10,
    left: 5,
    right: 5,
  };


  constructor(x) {
    super();
    this.y = 350;
    this.x = x + Math.random() * 2500;
    this.speed = 1.5;
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }


  /**
   * @function
   * holds the animations and functions to move and animate the baby chicken 
   */
  animate() {
    this.walkAnimation();
    this.applyChickenGravity();
    this.jumping();
    this.isMovingLeft();
  }


  /**
   * plays the walk animation
   */
  walkAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }


  /**
   * moves the babychicken left
   */
  isMovingLeft() {
    setInterval(() => {
      if(startGame == true)
      this.moveLeft();
    }, 1000 / 60);
  }


  /**
 * Make the chicken jump randomly
 *
 * @function
 */
  jumping() {
    setInterval(() => {
      if (this.chickenIsOnGround()) {
        this.jump();
      }
    }, Math.random() * 2000);
  }
}
