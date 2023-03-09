class StatusBarBoss extends DrawableObject {
  x = 680;
  y = 0;
  width = 250;
  height = 75;
  perctentage = 100;

  
  IMAGES_BOSS = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];


  constructor() {
    super();
    this.loadImages(this.IMAGES_BOSS);
    this.setPercentage(100);
  }
}
