class StatusBarBottle extends DrawableObject {
  storedBottles = [];
  collectedBottle = 0;

  
  constructor() {
    super();
    this.loadImage("img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.x = 280;
    this.y = 5;
    this.width = 70;
    this.height = 70;
  }
}