class Zombie extends Character {
  constructor() {
    super(
      gfxManager.getGfx("zombie"),
      gfxManager.getGfx("zombie"),
      0,
      0,
      1,
      getRandomInt(0, 1),
      getRandomInt(0, 1)
    );

    let nbTry = 0;

    do {
      nbTry++;
      this.x = getRandomInt(0, width - this.w);
      this.y = getRandomInt(0, height - 200 - this.h);
    } while (wallManager.isAnyCollide(this) && nbTry < 100);
    if (nbTry > 100) {
      this.x = 0;
      this.y = 0;
    }

    this.setNewTimeChangeDir();
    this.timerChangeDir = 0;
    this.state = "walk";
    this.radiusDetect =
      Math.max(this.w / 2, this.h / 2) + getRandomInt(50, 400);
    this.targetPlayer = null;
    this.targetPlayerDist = 0;
  }

  setNewTimeChangeDir() {
    this.timeChangeDir = getRandomInt(40, 60);
  }

  randomChangeDir() {
    let newDir = getRandomInt(1, 4);
    switch (newDir) {
      case 1:
        this.vx = 1;
        this.vy = 0;
        break;
      case 2:
        this.vx = -1;
        this.vy = 0;
        break;
      case 3:
        this.vx = 0;
        this.vy = 1;
        break;
      default:
        this.vx = 0;
        this.vy = -1;
        break;
    }
  }

  setAttackTarget() {
    let dist, distMin;
    let targetPlayer = null;
    distMin = 10000;
    for (let player of playerManager.lstPlayer) {
      dist = getDistance(this.x, this.y, player.x, player.y);
      if (dist < distMin) {
        distMin = dist;
        targetPlayer = player;
      }
    }
    if (distMin < this.radiusDetect) {
      this.targetPlayer = targetPlayer;
      this.targetPlayerDist = distMin;
    } else {
      this.targetPlayer = null;
      this.targetPlayerDist = 0;
    }
  }

  update() {
    this.setAttackTarget();
    if (this.targetPlayer == null) {
      this.state = "walk";
    } else {
      if (this.targetPlayerDist > this.w / 2) {
        this.state = "follow";
      } else {
        this.state = "bite";
      }
    }

    if (this.state == "walk") {
      this.timerChangeDir++;
      if (this.timerChangeDir >= this.timeChangeDir) {
        this.timerChangeDir = 0;
        this.setNewTimeChangeDir();
        this.randomChangeDir();
      }
    } else if (this.state == "follow") {
      let angle = getAngle(
        this.x,
        this.y,
        this.targetPlayer.x,
        this.targetPlayer.y
      );
      this.vx = Math.cos(angle);
      this.vy = Math.sin(angle);
    } else if (this.state == "bite") {
      this.targetPlayer.setDamage(10);
    }

    let isOutEdge = super.update();

    if (isOutEdge) {
      this.vx *= -1;
      this.vy *= -1;
    }
  }

  draw() {
    super.draw();
    if (DEBUG) {
      noFill();
      stroke(255, 0, 0);
      circle(this.x + this.w / 2, this.y + this.h / 2, this.radiusDetect * 2);
      textSize(20);
      text(this.state + " - " + this.radiusDetect, this.x, this.y - 10);
      if (this.targetPlayer != null) {
        line(
          this.x + this.w / 2,
          this.y + this.h / 2,
          this.targetPlayer.x + this.w / 2,
          this.targetPlayer.y + this.h / 2
        );
        text(
          this.targetPlayerDist,
          this.targetPlayer.x,
          this.targetPlayer.y - 10
        );
      }
    }
  }
}

class ZombieManager {
  constructor() {
    this.lstZombie = [];
    this.spwanDelay = 7200; // 2 mn (60 frms/s * 60s * 2mm = 7200 frames)
    this.spawnTimer = 0;
  }

  generateZombie() {
    let zombie = new Zombie();
    this.lstZombie.push(zombie);
  }

  isAnyCollide(pWall) {
    let isCollide = false;
    for (let zombie of this.lstZombie) {
      if (
        isCircleCollideRect(
          pWall.x,
          pWall.y,
          pWall.w / 2,
          zombie.x,
          zombie.y,
          zombie.w,
          zombie.h
        )
      ) {
        isCollide = true;
        break;
      }
    }
    return isCollide;
  }

  update() {
    let zombie;

    if (this.spawnTimer < this.spwanDelay) {
      this.spawnTimer++;
    } else {
      for (let i = 0; i < 20; i++) {
        this.generateZombie();
      }
      this.spawnTimer = 0;
    }

    for (zombie of this.lstZombie) {
      zombie.update();
    }
    for (let i = this.lstZombie.length - 1; i >= 0; i--) {
      zombie = this.lstZombie[i];
      if (zombie.isDead) {
        this.lstZombie.splice(i, 1);
      }
    }
  }

  draw() {
    for (let zombie of this.lstZombie) {
      zombie.draw();
    }
  }
}
