class Wall {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.h = 100;
    this.w = 10;
    this.setNewTimeSwitch();
    this.timerSwitch = 0;
  }

  setNewTimeSwitch() {
    this.timeSwitch = getRandomInt(200, 10000);
  }

  switch() {
    let oldHeight = this.h;
    this.h = this.w;
    this.w = oldHeight;
  }

  update() {
    this.timerSwitch++;
    if (this.timerSwitch >= this.timeSwitch) {
      this.timerSwitch = 0;
      if (
        !zombieManager.isAnyCollide(this) &&
        !playerManager.isAnyCollide(this)
      ) {
        this.switch();
      }
    }
  }

  draw() {
    rectMode(CENTER);
    if (DEBUG) {
      noFill();
      stroke(0, 0, 255);
      circle(this.x, this.y, Math.max(this.w, this.h));
    }
    fill(100);
    rect(this.x, this.y, this.w, this.h);
  }
}

class WallManager {
  constructor() {
    this.lstWall = [];
  }

  generateWalls() {
    // let wall = new Wall();
    // wall.x = 200;
    // wall.y = 200;
    // this.lstWall.push(wall);

    for (let y = 300; y < height - 200; y += 120) {
      for (let x = 60; x < width; x += 130) {
        let wall = new Wall();
        if (getRandomInt(1, 100) <= 30) {
          wall.w = 10;
          wall.h = 100;
        } else {
          wall.w = 100;
          wall.h = 10;
        }
        wall.x = x;
        wall.y = y;
        this.lstWall.push(wall);
      }
    }
  }

  isAnyCollide(pCharacter) {
    for (let wall of this.lstWall) {
      if (
        isRectCollideRect(
          wall.x - wall.w / 2,
          wall.y - wall.h / 2,
          wall.w,
          wall.h,
          pCharacter.x,
          pCharacter.y,
          pCharacter.w,
          pCharacter.h
        )
      ) {
        return wall;
      }
    }
    return null;
  }

  update() {
    for (let wall of this.lstWall) {
      wall.update();
    }
  }

  draw() {
    for (let wall of this.lstWall) {
      wall.draw();
    }
  }
}
