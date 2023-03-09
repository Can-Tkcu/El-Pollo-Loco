class Heart extends MovableObject {
  width = 80;
  height = 80;

  
  offset = {
    top: 30,
    bottom: 10,
    left: 30,
    right: 30,
  };


  IMAGES_HEART = ["img/7_statusbars/3_icons/icon_health.png"];


  constructor(x, y) {
    super().loadImage(this.IMAGES_HEART[0]);
    this.x = x;
    this.y = y;
  }
}
