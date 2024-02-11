class Character {
  constructor(pLstFrame, pX, pY, pSpeed = 0, pVx = 0, pVy = 0) {
    this.lstFrame = pLstFrame;
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

  update() {
    let outEdge = false;

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
        this.x = wall.x - wall.w / 2 - this.w;
      } else {
        this.x = wall.x + wall.w / 2;
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
        this.y = wall.y - wall.h / 2 - this.h;
      } else {
        this.y = wall.y + wall.h / 2;
      }
      outEdge = true;
    }

    this.updateFrame();
    return outEdge;
  }

  draw() {
    let img = this.lstFrame[this.currentFrame];
    image(img, this.x, this.y);
  }
}
