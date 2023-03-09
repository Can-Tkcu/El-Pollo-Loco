class Level {
  enemies;
  smallEnemies;
  endboss;
  clouds;
  backgroundObjects;
  coins;
  hearts;
  bottles;
  level_end_x = 6800;

  
  constructor(enemies, smallEnemies, endboss, clouds, coins, hearts, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.smallEnemies = smallEnemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.coins = coins;
    this.hearts = hearts;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}