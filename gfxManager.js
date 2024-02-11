class GfxManager {
  constructor() {
    this.lstGfx = {};
  }

  addGfx(pName, pPath, pNbFrame = 1) {
    let lstFrame = [];

    for (let i = 0; i < pNbFrame; i++) {
      lstFrame[i] = loadImage(pPath + "_" + (i + 1) + ".png");
    }
    this.lstGfx[pName] = lstFrame;
  }

  getGfx(pName) {
    return this.lstGfx[pName];
  }
}
