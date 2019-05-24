class GemPrimary {
  constructor(ctx, vel) {
    const gemImages = [
      // { color: "blue", imgSrc: "./assets/images/cat.png" },
      // { color: "red", imgSrc: "./assets/images/cat.png" },
      // { color: "green", imgSrc: "./assets/images/cat.png" },
      // { color: "yellow", imgSrc: "./assets/images/cat.png" }
      { type: "gem", color: "blue", imgSrc: "./assets/images/SPF2T_Gem_Blue.png" },
      { type: "gem", color: "red", imgSrc: "./assets/images/SPF2T_Gem_Red.png" },
      { type: "gem", color: "green", imgSrc: "./assets/images/SPF2T_Gem_Green.png" },
      { type: "gem", color: "yellow", imgSrc: "./assets/images/SPF2T_Gem_Yellow.png" },
      { type: "gem", color: "blue", imgSrc: "./assets/images/SPF2T_Gem_Blue.png" },
      { type: "gem", color: "red", imgSrc: "./assets/images/SPF2T_Gem_Red.png" },
      { type: "gem", color: "green", imgSrc: "./assets/images/SPF2T_Gem_Green.png" },
      { type: "gem", color: "yellow", imgSrc: "./assets/images/SPF2T_Gem_Yellow.png" },
      { type: "gem", color: "blue", imgSrc: "./assets/images/SPF2T_Gem_Blue.png" },
      { type: "gem", color: "red", imgSrc: "./assets/images/SPF2T_Gem_Red.png" },
      { type: "gem", color: "green", imgSrc: "./assets/images/SPF2T_Gem_Green.png" },
      { type: "gem", color: "yellow", imgSrc: "./assets/images/SPF2T_Gem_Yellow.png" },
      { type: "gem", color: "blue", imgSrc: "./assets/images/SPF2T_Gem_Blue.png" },
      { type: "gem", color: "red", imgSrc: "./assets/images/SPF2T_Gem_Red.png" },
      { type: "gem", color: "green", imgSrc: "./assets/images/SPF2T_Gem_Green.png" },
      { type: "gem", color: "yellow", imgSrc: "./assets/images/SPF2T_Gem_Yellow.png" },
      { type: "crash", color: "blue", imgSrc: "./assets/images/SPF2T_Crash_Blue.png" },
      { type: "crash", color: "red", imgSrc: "./assets/images/SPF2T_Crash_Red.png" },
      { type: "crash", color: "green", imgSrc: "./assets/images/SPF2T_Crash_Green.png" },
      { type: "crash", color: "yellow", imgSrc: "./assets/images/SPF2T_Crash_Yellow.png" }
    ];
    this.gem = gemImages[Math.floor(Math.random() * gemImages.length)];
    this.ctx = ctx;
    this.posX = 10;
    this.posY = 60;
    this.color = this.gem.color;
    this.type = this.gem.type;
    const img = new Image();
    img.src = this.gem.imgSrc;
    this.img = img;
    this.widthHeight = 50;
    this.vel = vel;
    this.col = 3;
    this.posRel = 2;
    this.otherVel = 5;
  }

  handleCollision(colHeight) {
    if ((this.posRel === 0 && this.posY >= colHeight - 50) || (this.posRel !== 0 && this.posY >= colHeight)) {
      this.posY = this.posRel === 0 ? colHeight - 50 : colHeight;
      this.vel = 0;
    }
  }

  updatePosY(newPosY) {
    this.posY = newPosY;
  }

  hardDrop(colHeight) {
    this.posY = this.posRel === 0 ? colHeight - 55 : colHeight - 5;
  }

  goLive(ctx) {
    this.ctx = ctx;
    this.posX = 150;
    this.posY = -5;
  }

  updateOtherVel() {
    this.otherVel = 0;
  }

  render() {
    this.ctx.drawImage(this.img, this.posX, this.posY, this.widthHeight, this.widthHeight);
  }

  drop(colHeight, vel = this.vel) {
    this.vel = vel;
    this.posY += vel;
    this.handleCollision(colHeight);
    this.render();
  }

  moveHorizontal(direction, adjColHeight) {
    if (this.otherVel !== 0 && this.vel !== 0) {
      if ((this.posRel === 0 && this.posY < adjColHeight - 50) || (this.posRel !== 0 && this.posY < adjColHeight)) {
        if (direction === "left") {
          this.posX -= 50;
          this.col -= 1;
        } else if (direction === "right") {
          this.posX += 50;
          this.col += 1;
        }
      }
    }
  }

  rotate(direction) {
    if (this.otherVel !== 0 && this.vel !== 0) {
      if (direction === 'cw') {
        this.posRel = (this.posRel + 1) % 4;
      } else {
        this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;
      }
    }
  }

}

export default GemPrimary;