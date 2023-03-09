class DeadBabyChicken extends MovableObject {
  width = 95;
  height = 95;
  
  
  IMAGES_DEAD_BABY_CHICKEN = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];


  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_DEAD_BABY_CHICKEN[0]);
    this.x = x;
    this.y = y;
  }
}
