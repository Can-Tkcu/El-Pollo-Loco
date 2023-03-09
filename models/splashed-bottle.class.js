class SplashedBottle extends MovableObject {
  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];


  constructor(x, y) {
    super().loadImage(this.IMAGES_SPLASH[0]);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.splashAnimation();
  }


  /**
* starts a new interval that calls the `playAnimation` function with the IMAGE_SPLASH property as its argument.
*
* @param {Array} IMAGES_SPLASH - array of images to animate
* @this {MovableObject} playAnimation - function that plays the animation of the array of images passed as its argument
*/
  splashAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);
    }, 100);
  }
}
