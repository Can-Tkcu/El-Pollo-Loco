let level1;
let startGame = false;


/**
 * initiates the gameworld 
 */
function initLevel() {
  level1 = new Level(
    Enemies,
    SmallEnemies,
    [new Endboss()],
    Clouds,
    ItemCoins,
    ItemHeart,
    ItemBottles,
    GameMap
  );
  setGameWorld();
}


/**
 * sets up game logic
 */
function setGameWorld() {
  init();
  toggleHUD();
  startGame = true;
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("start-game").classList.add("d-none");
  document.getElementById("fullscreen").classList.remove("d-none");
  document.getElementById("HUD-touch").classList.add("d-flex");
  document.getElementById("HUD-bar").innerHTML = "SETTINGS";
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// - ASSETS -


const Enemies = [
  new Chicken(2000),
  new Chicken(2000),
  new Chicken(2500),
  new Chicken(3000),
  new Chicken(3500),
  new Chicken(4000),
  new Chicken(4500),
  new Chicken(5000),
  new Chicken(5500),
  new Chicken(7000),
  new Chicken(7500),
  new Chicken(8000),
];


const SmallEnemies = [
  new BabyChicken(1000),
  new BabyChicken(2000),
  new BabyChicken(3000),
  new BabyChicken(3500),
  new BabyChicken(4000),
  new BabyChicken(6000),
  new BabyChicken(7000),
  new BabyChicken(8000),
];


const Clouds = [
  new Cloud("img/5_background/layers/4_clouds/1.png", 300),
  new Cloud("img/5_background/layers/4_clouds/2.png", 300),
  new Cloud("img/5_background/layers/4_clouds/1.png", 3000),
  new Cloud("img/5_background/layers/4_clouds/2.png", 3000),
  new Cloud("img/5_background/layers/4_clouds/1.png", 6000),
  new Cloud("img/5_background/layers/4_clouds/2.png", 6000),
];


const ItemCoins = [
  new Coins(300, 280),
  new Coins(345, 220),
  new Coins(385, 160),
  new Coins(425, 100),
  new Coins(465, 40),
  new Coins(505, 100),
  new Coins(545, 160),
  new Coins(585, 220),
  new Coins(625, 280),
  new Coins(1000, 280),
  new Coins(1200, 280),
  new Coins(1400, 280),
  new Coins(1600, 280),
  new Coins(1800, 280),
  new Coins(2000, 280),
  new Coins(2200, 280),
  new Coins(2400, 280),
  new Coins(2600, 280),
  new Coins(2800, 280),
  new Coins(3000, 280),
  new Coins(5000, 220),
  new Coins(5050, 200),
  new Coins(5100, 180),
  new Coins(5150, 160),
  new Coins(5200, 140),
  new Coins(5250, 120),
  new Coins(5300, 100),
  new Coins(5350, 80),
  new Coins(5400, 100),
  new Coins(5450, 120),
  new Coins(5500, 140),
  new Coins(5550, 160),
  new Coins(5600, 180),
  new Coins(5650, 200),
  new Coins(5700, 220),
  new Coins(5750, 240),
];


const ItemHeart = [new Heart(525, 40)];


const ItemBottles = [
  new SalsaBottle(-100),
  new SalsaBottle(-200),
  new SalsaBottle(-300),
  new SalsaBottle(-400),
  new SalsaBottle(-500),
  new SalsaBottle(-600),
  new SalsaBottle(1150),
  new SalsaBottle(1350),
  new SalsaBottle(1550),
  new SalsaBottle(1750),
  new SalsaBottle(1950),
  new SalsaBottle(2150),
  new SalsaBottle(2350),
  new SalsaBottle(2550),
  new SalsaBottle(2750),
  new SalsaBottle(2950),
];


const GameMap = [
  new BackgroundObject("img/5_background/layers/air.png", -960),
  new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -960),
  new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -960),
  new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -960),

  new BackgroundObject("img/5_background/layers/air.png", 0),
  new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
  new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
  new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

  new BackgroundObject("img/5_background/layers/air.png", 960),
  new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 960),
  new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 960),
  new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 960),

  new BackgroundObject("img/5_background/layers/air.png", 960 * 2),
  new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 960 * 2),
  new BackgroundObject("img/5_background/layers/2_second_layer/1.png",  960 * 2),
  new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 960 * 2),

  new BackgroundObject("img/5_background/layers/air.png", 960 * 3),
  new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 960 * 3),
  new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 960 * 3),
  new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 960 * 3),
    
  new BackgroundObject("img/5_background/layers/air.png", 960 * 4),
  new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 960 * 4),
  new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 960 * 4),
  new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 960 * 4),

  new BackgroundObject("img/5_background/layers/air.png", 960 * 5),
  new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 960 * 5),
  new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 960 * 5),
  new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 960 * 5),

  new BackgroundObject("img/5_background/layers/air.png", 960 * 6),
  new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 960 * 6),
  new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 960 * 6),
  new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 960 * 6),
    
  new BackgroundObject("img/5_background/layers/air.png", 960 * 7),
  new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 960 * 7),
  new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 960 * 7),
  new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 960 * 7)
]