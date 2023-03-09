class SalsaBottle extends MovableObject {
  height = 100;
  width = 100;
  y = 330;


  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };


  BOTTLE_IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];


  constructor(x) {
    super().loadImage(this.BOTTLE_IMAGES[0]);
    this.loadImages(this.BOTTLE_IMAGES);
    this.x = x;
    this.animate();
  }


  /**
 * starts a new interval that calls the `playAnimation` function with the BOTTLE_IMAGES property as its argument.
 * 
 * @param {Array} BOTTLE_IMAGES - array of images to animate
 * @param {MovableObject} playAnimation - function that plays the animation of the array of images passed as its argument
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.BOTTLE_IMAGES);
    }, 350);
  }
}
