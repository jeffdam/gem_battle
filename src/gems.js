class Gems {
  constructor({ pos, gemImages, col }) {
    this.posX = pos.x;
    this.posY = pos.y;
    this.color = gemImages.color;
    this.img = gemImages.imgSrc;
    this.width = 50;
    this.height = 50;
    this.vel = 5;
    this.col = col;
    this.posRel = 0;
  }

  handleCollision(id,colHeight) {
    if (this.posY >= colHeight) {
      this.vel = 0;
      cancelAnimationFrame(id);
    }
  }

  render(ctx) {
    const img = new Image();
    img.src = this.img;
    ctx.drawImage(img, this.posX, this.posY, this.width, this.height);
  }

  drop(ctx, id, colHeight) {
    this.handleCollision(id, colHeight);
    this.posY += this.vel;
    this.render(ctx);
  }

  moveHorizontal(direction, adjColHeight) {
    if (adjColHeight && direction === "left" && this.posX > 0 && this.posY < adjColHeight) {
      this.posX -= 50;
      this.col -= 1;
    } else if (adjColHeight && direction === "right" && this.posX < 250 && this.posY < adjColHeight) {
      this.posX += 50;
      this.col += 1;
    }
  }

  rotate(direction) {
    const rotationsCW = [{ dx: 50, dy: -50 }, { dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }];
    const rotationsCCW = [{ dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }, { dx: 50, dy: -50 }];
    if (direction === 'cw') {
      this.posRel = (this.posRel + 1) % 4;
      this.posX += rotationsCW[this.posRel].dx;
      this.posY += rotationsCW[this.posRel].dy;
    } else {
      this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;
      this.posX -= rotationsCCW[this.posRel].dx;
      this.posY -= rotationsCCW[this.posRel].dy;
    }
  }

}

module.exports = Gems;