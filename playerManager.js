class Player extends Character {
  constructor(pIsControllable = false) {
    super(
      gfxManager.getGfx("player"),
      gfxManager.getGfx("player_dead"),
      490,
      900,
      2,
      0,
      0
    );
    this.isControllable = pIsControllable;
    this.lifeMax = 100;
    this.life = this.lifeMax;
    this.timerFire = 0;
    this.delayFire = 30;
    this.win = false;
  }

  update() {
    if (this.isControllable && !this.isDead && !this.win) {
      if (this.timerFire > 0) {
        this.timerFire--;
      }
      this.vx = 0;
      this.vy = 0;
      if (keyIsDown(LEFT_ARROW)) {
        this.vx = -1;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.vx = 1;
      }
      if (keyIsDown(UP_ARROW)) {
        this.vy = -1;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.vy = 1;
      }
      if (keyIsDown(32) && this.timerFire <= 0) {
        bulletManager.createBullet(
          this.x + this.w / 2 - 16,
          this.y + this.h / 2 - 16,
          this.vx,
          this.vy
        );
        this.timerFire = this.delayFire;
      }
    }
    super.update();

    if (
      isCircleCollideRect(
        width / 2 + 25,
        50,
        75 / 2,
        this.x,
        this.y,
        this.w,
        this.h
      )
    ) {
      this.win = true;
    }
  }

  draw() {
    if (this.isDead) {
      this.lstFrame = this.lstDeadFrame;
    }
    super.draw();
  }
}

class PlayerManager {
  constructor() {
    this.lstPlayer = [];
    this.currentPlayer = null;
  }

  add() {
    this.currentPlayer = new Player(true);
    this.lstPlayer.push(this.currentPlayer);
  }

  isAnyCollide(pWall) {
    let isCollide = false;
    for (let player of this.lstPlayer) {
      if (
        isCircleCollideRect(
          pWall.x,
          pWall.y,
          Math.max(pWall.w, pWall.h) / 2,
          player.x,
          player.y,
          player.w,
          player.h
        )
      ) {
        isCollide = true;
        break;
      }
    }
    return isCollide;
  }

  update() {
    for (let player of this.lstPlayer) {
      player.update();
    }
  }

  draw(pDrawAlive = true) {
    for (let player of this.lstPlayer) {
      if ((pDrawAlive && !player.isDead) || (!pDrawAlive && player.isDead))
        player.draw();
    }

    textSize(20);
    text("Life", width - 180, 20);

    fill(100);
    rectMode(CORNER);
    rect(width - 320, 30, 300, 20, 20);

    if (this.currentPlayer != null && !this.currentPlayer.isDead) {
      let widthLife = Math.floor(
        (this.currentPlayer.life * 300) / this.currentPlayer.lifeMax
      );
      fill(255, 0, 0);
      rect(width - 320, 30, widthLife, 20, 20);
    }
  }
}
