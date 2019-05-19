class GemPrimary {
  constructor({ gemImages }) {
    this.posX = 150;
    this.posY = -5;
    this.color = gemImages.color;
    this.img = gemImages.imgSrc;
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

  updateOtherVel(colHeight) {
    this.otherVel = 0;
  }

  render(ctx) {
    const img = new Image();
    img.src = this.img;
    ctx.drawImage(img, this.posX, this.posY, this.widthHeight, this.widthHeight);
  }

  drop(ctx, colHeight) {
    this.posY += this.vel;
    this.handleCollision(colHeight);
    this.render(ctx);
  }

  moveHorizontal(direction, adjColHeight) {
    if (this.otherVel !== 0 && this.vel !== 0) {
      if ((this.posRel === 0 && this.posY < adjColHeight - 50) || (this.posRel !== 0 && this.posY < adjColHeight)) {
        if ((direction === "left") && ((this.posRel === 1 && this.col > 2) || (this.posRel !== 1 && this.col > 1))) {
          this.posX -= 50;
          this.col -= 1;
        } else if ((direction === "right") && ((this.posRel === 3 && this.col < 5) || (this.posRel !== 3 && this.col < 6))) {
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