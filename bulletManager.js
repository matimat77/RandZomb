class Bullet {
  constructor(pX, pY, pVx, pVy) {
    this.img = gfxManager.getGfx("bullet")[0];
    this.x = pX;
    this.y = pY;
    this.w = this.img.width;
    this.h = this.img.height;
    this.speed = 10;
    this.vx = pVx;
    this.vy = pVy;
    if (this.vx == 0 && this.vy == 0) {
      this.vy = -1;
    }
    this.isDead = false;
  }

  update() {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;

    for (let zombie of zombieManager.lstZombie) {
      if (
        isRectCollideRect(
          this.x,
          this.y,
          this.w,
          this.h,
          zombie.x,
          zombie.y,
          zombie.w,
          zombie.h
        )
      ) {
        zombie.setDamage(1);
        this.isDead = true;
        break;
      }
    }
    for (let wall of wallManager.lstWall) {
      if (
        isRectCollideRect(
          this.x,
          this.y,
          this.w,
          this.h,
          wall.x,
          wall.y,
          wall.w,
          wall.h
        )
      ) {
        this.isDead = true;
        break;
      }
    }
  }

  draw() {
    image(this.img, this.x, this.y);
  }
}

class BulletManager {
  constructor() {
    this.lstBullet = [];
  }

  createBullet(pX, pY, pVx, pVy) {
    let bullet = new Bullet(pX, pY, pVx, pVy);
    this.lstBullet.push(bullet);
  }

  update() {
    let bullet;
    for (bullet of this.lstBullet) {
      bullet.update();
    }
    for (let i = this.lstBullet.length - 1; i >= 0; i--) {
      bullet = this.lstBullet[i];
      if (bullet.isDead) {
        this.lstBullet.splice(i, 1);
      }
    }
  }

  draw() {
    for (let bullet of this.lstBullet) {
      bullet.draw();
    }
  }
}
