let canvas;
let gfxManager;
let zombieManager;
let wallManager;
let playerManager;
let FPS = 60;
let DEBUG = false;

function preload() {
  gfxManager = new GfxManager();
  gfxManager.addGfx("zombie", "gfx/monster", 2);
  gfxManager.addGfx("player", "gfx/player", 4);
}

function setup() {
  canvas = createCanvas(1280, 1024);
  frameRate(FPS);
  start();
}

function start() {
  wallManager = new WallManager();
  wallManager.generateWalls();

  zombieManager = new ZombieManager();
  for (let i = 0; i < 20; i++) {
    zombieManager.generateZombie();
  }
  playerManager = new PlayerManager();
  playerManager.add();
}

function update() {
  zombieManager.update();
  wallManager.update();
  playerManager.update();
}

function draw() {
  update();
  background(255);
  zombieManager.draw();
  wallManager.draw();
  playerManager.draw();
}

function keyPressed() {
  return false; // prevent any default behaviour
}
