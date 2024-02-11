class Character {
  constructor(
    pLstLiveFrame,
    pLstDeadFrame,
    pX,
    pY,
    pSpeed = 0,
    pVx = 0,
    pVy = 0
  ) {
    this.lstLiveFrame = pLstLiveFrame;
    this.lstDeadFrame = pLstDeadFrame;
    this.lstFrame = this.lstLiveFrame;
    this.currentFrame = 0;
    this.w = this.lstFrame[this.currentFrame].width;
    this.h = this.lstFrame[this.currentFrame].height;
    this.timeChangeFrame = 30;
    this.timerChangeFrame = 0;
    this.x = pX;
    this.y = pY;
    this.vx = pVx;
    this.vy = pVy;
    this.speed = pSpeed;
    this.lifeMax = 1;
    this.life = this.lifeMax;
    this.isDead = false;
    this.timerInvincible = 0;
    this.timeInvincible = 60;
    this.invisible = false;
  }

  updateFrame() {
    this.timerChangeFrame++;
    if (this.timerChangeFrame >= this.timeChangeFrame) {
      this.currentFrame++;
      this.timerChangeFrame = 0;
    }
    if (this.currentFrame >= this.lstFrame.length) {
      this.currentFrame = 0;
    }
    this.w = this.lstFrame[this.currentFrame].width;
    this.h = this.lstFrame[this.currentFrame].height;
  }

  setDamage(pAmount) {
    if (this.timerInvincible <= 0) {
      this.life -= pAmount;
      this.timerInvincible = this.timeInvincible;
      if (this.life <= 0) {
        this.isDead = true;
        this.lstFrame = this.lstDeadFrame;
        this.currentFrame = 0;
        this.vx = 0;
        this.vy = 0;
      }
    }
  }

  update() {
    let outEdge = false;

    if (this.timerInvincible <= 0) {
      this.timerInvincible = 0;
    } else {
      this.timerInvincible--;
    }

    this.x += this.vx * this.speed;
    if (this.x + this.w > width) {
      this.x = width - this.w;
      outEdge = true;
    } else if (this.x < 0) {
      this.x = 0;
      outEdge = true;
    }

    let wall = wallManager.isAnyCollide(this);
    if (wall != null) {
      if (this.vx > 0) {
        this.x = wall.x - wall.w / 2 - this.w - 1;
      } else {
        this.x = wall.x + wall.w / 2 + 1;
      }
      outEdge = true;
    }

    this.y += this.vy * this.speed;
    if (this.y + this.h > height) {
      this.y = height - this.h;
      outEdge = true;
    } else if (this.y < 0) {
      this.y = 0;
      outEdge = true;
    }

    wall = wallManager.isAnyCollide(this);
    if (wall != null) {
      if (this.vy > 0) {
        this.y = wall.y - wall.h / 2 - this.h - 1;
      } else {
        this.y = wall.y + wall.h / 2 + 1;
      }
      outEdge = true;
    }

    this.updateFrame();
    return outEdge;
  }

  draw() {
    if (this.timerInvincible > 0) {
      if (this.timerInvincible % 4 == 0) {
        this.invisible = !this.invisible;
      }
      if (this.invisible) {
        tint(255, 255, 255, 100);
      }
    }
    let img = this.lstFrame[this.currentFrame];

    if (DEBUG) {
      rectMode(CORNER);
      noFill();
      stroke(0, 0, 255);
      rect(this.x, this.y, this.w, this.h);
    }
    image(img, this.x, this.y);
    tint(255);
  }
}
