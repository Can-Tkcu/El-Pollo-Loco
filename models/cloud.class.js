class Cloud extends MovableObject {
  y = 15;
  height = 290;
  width = 500;


  constructor(cloud, x) {
    super();
    this.loadImage(cloud);
    this.loadImage(cloud);
    this.animate();
    this.x = x + Math.random() * 2000;
  }


  /**
   * @function
   * moves the clouds from right to left
   */
  animate() {
    this.speed = 0.30;
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
