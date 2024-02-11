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
      if (!zombieManager.isAnyCollide(this)) {
        this.switch();
      }
    }
  }

  draw() {
    rectMode(CENTER);
    fill(100);
    rect(this.x, this.y, this.w, this.h);
  }
}

class WallManager {
  constructor() {
    this.lstWall = [];
  }

  generateWalls() {
    for (let y = 300; y < height - 200; y += 120) {
      for (let x = 50; x < width - 50; x += 130) {
        let wall = new Wall();
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
          wall.y,
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
