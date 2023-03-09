class Overlay extends MovableObject {
  x = 860;
  y = 6;
  width = 80;
  height = 80;

  
  IMAGE = ["img/7_statusbars/3_icons/icon_health_endboss.png"];


  constructor() {
    super();
    this.loadImage(this.IMAGE);
  }
}
