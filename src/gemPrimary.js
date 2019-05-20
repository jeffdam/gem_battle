class GemPrimary {
  constructor({ ctx, gem }) {
    this.ctx = ctx;
    this.posX = 10;
    this.posY = 10;
    this.color = gem.color;
    this.type = gem.type;
    const img = new Image();
    img.src = gem.imgSrc;
    this.img = img;
    this.widthHeight = 50;
    this.vel = 5;
    this.col = 4;
    this.posRel = 2;
    this.otherVel = 5;
  }

  handleCollision(colHeight) {
    if ((this.posRel === 0 && this.posY >= colHeight - 50) || (this.posRel !== 0 && this.posY >= colHeight)) {
      this.vel = 0;
    }
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

  drop(colHeight) {
    this.posY += this.vel;
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

module.exports = GemPrimary;