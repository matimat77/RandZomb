class Player extends Character {
  constructor(pIsControllable = false) {
    super(gfxManager.getGfx("player"), 490, 900, 2, 0, 0);
    self.isControllable = pIsControllable;
  }

  update() {
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
    super.update();
  }
}

class PlayerManager {
  constructor() {
    this.lstPlayer = [];
  }

  add() {
    let player = new Player(true);
    this.lstPlayer.push(player);
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

  draw() {
    for (let player of this.lstPlayer) {
      player.draw();
    }
  }
}
