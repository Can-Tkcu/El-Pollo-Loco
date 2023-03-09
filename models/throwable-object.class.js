class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 90;
    this.width = 90;
    this.throw();
    this.animate();
  }


  /**
* Throws an object with an initial speed, and applies gravity.
* Updates the position of the object on an interval.
*
* @property {Number} speedY - initial speed of the object.
* @property {Number} x - position of the object on the x-axis.
* @this {MovableObject} - applyGravity method inherited from MovableObject class.
*/
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 15;
    }, 25);
  }


  /**
 * starts a new interval that calls the `playAnimation` function with the IMAGE_BOTTLE_ROTATION property as its argument.
 * 
 * @param {Array} IMAGES_BOTTLES_ROTATION - array of images to animate
 * @param {MovableObject} playAnimation - function that plays the animation of the array of images passed as its argument
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }, 90);
  }
}
