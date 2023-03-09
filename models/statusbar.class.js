class Statusbar extends DrawableObject {
  x = 30;
  y = 0;
  width = 250;
  height = 75;
  perctentage = 100;


  IMAGES_CHAR = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  
  constructor() {
    super();
    this.loadImages(this.IMAGES_CHAR);
    this.setPercentage(100);
  }
}
