class Coins extends MovableObject {
  height = 200;
  width = 200;

  
  offset = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 60,
  };


  COIN_IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];


  constructor(x, y) {
    super().loadImage(this.COIN_IMAGES[0]);
    this.loadImages(this.COIN_IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
  }


  /**
   * animates the coins 
   * @function
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.COIN_IMAGES);
    }, 400);
  }
}
