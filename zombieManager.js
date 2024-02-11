class Zombie extends Character {
  constructor() {
    super(gfxManager.getGfx("zombie"), 0, 0, 1, 0, 1);
    this.x = getRandomInt(0, width - this.w);
    this.y = 0;

    this.setNewTimeChangeDir();
    this.timerChangeDir = 0;
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
  update() {
    this.timerChangeDir++;
    if (this.timerChangeDir >= this.timeChangeDir) {
      this.timerChangeDir = 0;
      this.setNewTimeChangeDir();
      this.randomChangeDir();
    }

    let isOutEdge = super.update();

    if (isOutEdge) {
      this.vx *= -1;
      this.vy *= -1;
    }
  }

  //   draw() {
  //     super.draw();
  //   }
}

class ZombieManager {
  constructor() {
    this.lstZombie = [];
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
    for (let zombie of this.lstZombie) {
      zombie.update();
    }
  }

  draw() {
    for (let zombie of this.lstZombie) {
      zombie.draw();
    }
  }
}
