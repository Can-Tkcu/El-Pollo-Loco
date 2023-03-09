class GameOver extends DrawableObject {
  width = 960;
  height = 480;
  y = 0;

  
  constructor(img, x) {
    super().loadImage(img);
    this.x = x - 100;
  }
}
