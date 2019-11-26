import GemPrimary from "./gemPrimary";
import GemSecondary from "./gemSecondary";

class GemPair {
  constructor(ctx, vel) {
    this.gemPrimary = new GemPrimary(ctx, vel);
    this.gemSecondary = new GemSecondary(ctx, vel);
  }

  getGems() {
    return {
      gemPrimary: this.gemPrimary,
      gemSecondary: this.gemSecondary
    };
  }

  hasStopped() {
    return !this.gemPrimary.isDropping() && !this.gemSecondary.isDropping();
  }

  rotate(direction) {
    this.gemPrimary.rotate(direction);
    this.gemSecondary.rotate(direction);
  }

  rotateCW(gemStorage) {
    let adjColHeight;
    switch (this.gemSecondary.posRel) {
      case 0:
        adjColHeight = gemStorage.height(this.gemSecondary.col + 1) - 50;
        if (this.gemSecondary.posY < adjColHeight) {
          this.rotate("cw");
        }
        break;
      case 1:
        adjColHeight = gemStorage.height(this.gemSecondary.col - 1) - 50;
        if (
          this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col) &&
          this.gemSecondary.posY < adjColHeight
        ) {
          this.rotate("cw");
        }
        break;
      case 2:
        adjColHeight = gemStorage.height(this.gemSecondary.col - 1);
        if (this.gemSecondary.posY < adjColHeight) {
          this.rotate("cw");
        }
        break;
      case 3:
        this.rotate("cw");
        break;
    }
  }

  rotateCCW(gemStorage) {
    let adjColHeight;
    switch (this.gemSecondary.posRel) {
      case 0:
        adjColHeight = gemStorage.height(this.gemSecondary.col - 1) - 50;
        if (this.gemSecondary.posY < adjColHeight) {
          this.rotate("ccw");
        }
        break;
      case 1:
        this.rotate("ccw");
        break;
      case 2:
        adjColHeight = gemStorage.height(this.gemSecondary.col + 1);
        if (this.gemSecondary.posY < adjColHeight) {
          this.rotate("ccw");
        }
        break;
      case 3:
        adjColHeight = gemStorage.height(this.gemSecondary.col + 1) - 50;
        if (
          this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col) &&
          this.gemSecondary.posY < adjColHeight
        ) {
          this.rotate("ccw");
        }
        break;
    }
  }

  moveHorizontal(direction, gemStorage) {
    const adjCol = direction === "left" ? -1 : 1;
    const gemPrimaryClear = this.gemPrimary.posY < gemStorage.height(this.gemPrimary.col + adjCol);
    const gemSecondaryClear = this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col + adjCol);
    if (gemPrimaryClear && gemSecondaryClear && this.gemPrimary.isDropping() && this.gemSecondary.isDropping()) {
      this.gemPrimary.moveHorizontal(direction);
      this.gemSecondary.moveHorizontal(direction);
    }
  }

  hardDrop(gemStorage) {
    this.gemPrimary.hardDrop(gemStorage.height(this.gemPrimary.col));
    this.gemSecondary.hardDrop(gemStorage.height(this.gemSecondary.col));
  }

  render(gemStorage) {
    this.gemSecondary.drop(gemStorage.height(this.gemSecondary.col));
    this.gemPrimary.drop(gemStorage.height(this.gemPrimary.col));
    if (this.gemPrimary.vel === 0) {
      this.gemSecondary.updateOtherVel();
    } else if (this.gemSecondary.vel === 0) {
      this.gemPrimary.updateOtherVel();
    }
  }

  renderStaging() {
    this.gemPrimary.render();
    this.gemSecondary.render();
  }

  goLive(ctx) {
    this.gemPrimary.goLive(ctx);
    this.gemSecondary.goLive(ctx);
  }
}

export default GemPair;
