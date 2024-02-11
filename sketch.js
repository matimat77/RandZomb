let canvas;
let gfxManager;
let zombieManager;
let wallManager;
let playerManager;
let bulletManager;
let FPS = 60;
let DEBUG = false;

function preload() {
  gfxManager = new GfxManager();
  gfxManager.addGfx("zombie", "gfx/monster", 2);
  gfxManager.addGfx("player", "gfx/player", 4);
  gfxManager.addGfx("player_dead", "gfx/dead", 1);
  gfxManager.addGfx("bullet", "gfx/bullet", 1);
}

function setup() {
  canvas = createCanvas(1420, 1024);
  frameRate(FPS);
  start();
}

function start() {
  bulletManager = new BulletManager();

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
  if (!playerManager.currentPlayer.win) {
    bulletManager.update();
    zombieManager.update();
    wallManager.update();
    playerManager.update();
  }
}

function draw() {
  update();
  background(255);

  circle(width / 2 + 25, 50, 75);
  fill(255);
  circle(width / 2 + 25, 50, 50);
  fill(255, 0, 0);
  circle(width / 2 + 25, 50, 25);
  textSize(24);
  text("Go here to win", width / 2 - 35, 115);
  text("Space to fire, move with arrows", width / 2 - 100, 150);

  noFill();
  rectMode(CORNER);
  rect(1, 1, width - 1, height - 1);
  playerManager.draw(false);
  zombieManager.draw();
  bulletManager.draw();
  wallManager.draw();
  playerManager.draw(true);

  if (playerManager.currentPlayer.win) {
    fill(0);
    rect(300, height / 2 - 100, width - 400, 300);
    textSize(80);
    fill(255);
    text("YOU WIN !!!", width / 2 - 150, height / 2);
    text("Refresh page to restart", width / 2 - 300, height / 2 + 100);
  }
}

function keyPressed() {
  return false; // prevent any default behaviour
}
