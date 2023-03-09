class StatusBarCoin extends DrawableObject {
  storedCoins = [];
  collectedCoins = 0;

  
  constructor() {
    super();
    this.loadImage("img/7_statusbars/3_icons/icon_coin.png");
    this.x = 360;
    this.y = 5;
    this.width = 70;
    this.height = 70;
  }
}