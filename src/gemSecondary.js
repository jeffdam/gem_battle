import GemPrimary from './gemPrimary';

class GemSecondary extends GemPrimary {
  constructor(ctx, vel) {
    super(ctx, vel);
    this.posY = 10;
    this.posRel = 0;
  }

  goLive(ctx) {
    super.goLive(ctx);
    this.posY = -55;
  }

  rotate(direction) {
    if (this.otherVel !== 0 && this.vel !== 0) {
      if (direction === 'cw') {
        if (!(this.col === 0 && this.posRel === 2) && !(this.col === 5 && this.posRel === 0)) {
          const rotationsCW = [{ dx: 50, dy: -50 }, { dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }];
          this.col = (this.posRel === 1 || this.posRel === 2) ? (this.col - 1) : (this.col + 1);
          this.posRel = (this.posRel + 1) % 4;
          this.posX += rotationsCW[this.posRel].dx;
          this.posY += rotationsCW[this.posRel].dy;
        }
      } else {
        if (!(this.col === 0 && this.posRel === 0) && !(this.col === 5 && this.posRel === 2)) {
          const rotationsCCW = [{ dx: 50, dy: 50 }, { dx: -50, dy: 50 }, { dx: -50, dy: -50 }, { dx: 50, dy: -50 }];
          this.col = (this.posRel === 0 || this.posRel === 1) ? (this.col - 1) : (this.col + 1);
          this.posRel = this.posRel - 1 < 0 ? 3 : this.posRel - 1;
          this.posX -= rotationsCCW[this.posRel].dx;
          this.posY -= rotationsCCW[this.posRel].dy;
        }
      }
    }
  }

}

export default GemSecondary;