class Chicken extends MovableObject {
  y = 330;
  width = 95;
  height = 95;

  
  offset = {
    top: 0,
    bottom: 10,
    left: 30,
    right: 30,
  };


  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];


  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.x = x + Math.random() * 500; // positioning of chicken
    this.loadImages(this.IMAGES_WALKING); // loading walking animation from imageCache
    this.speed = 0.3 + Math.random() * 0.5; // speed of chicken
    this.animate();
  }


  /**
   * animates the chicken walk animation and moves them from right to left
   *  */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 90);
    setInterval(() => {
      if(startGame == true)
      this.moveLeft();
    }, 1000 / 60);
  }
}
