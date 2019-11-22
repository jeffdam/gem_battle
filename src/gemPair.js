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
    return this.gemPrimary.vel === 0 && this.gemSecondary.vel === 0;
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
    if (direction === "left") {
      this.gemPrimary.moveHorizontal(
        "left",
        gemStorage.height(this.gemPrimary.col - 1)
      );
      this.gemSecondary.moveHorizontal(
        "left",
        gemStorage.height(this.gemSecondary.col - 1)
      );
    } else {
      this.gemPrimary.moveHorizontal(
        "right",
        gemStorage.height(this.gemPrimary.col + 1)
      );
      this.gemSecondary.moveHorizontal(
        "right",
        gemStorage.height(this.gemSecondary.col + 1)
      );
    }
  }

  moveLeft(gemStorage) {
    if (
      this.gemPrimary.posRel === 1 &&
      this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col - 1)
    ) {
      this.gemPrimary.moveHorizontal(
        "left",
        gemStorage.height(this.gemSecondary.col)
      );
      this.gemSecondary.moveHorizontal(
        "left",
        gemStorage.height(this.gemSecondary.col - 1)
      );
    } else if (
      this.gemSecondary.posRel === 1 &&
      this.gemPrimary.posY < gemStorage.height(this.gemPrimary.col - 1)
    ) {
      this.gemPrimary.moveHorizontal(
        "left",
        gemStorage.height(this.gemPrimary.col - 1)
      );
      this.gemSecondary.moveHorizontal(
        "left",
        gemStorage.height(this.gemPrimary.col)
      );
    } else if (this.gemPrimary.posRel !== 3 && this.gemSecondary.posRel !== 3) {
      this.moveHorizontal("left", gemStorage);
    }
  }

  moveRight(gemStorage) {
    if (
      this.gemPrimary.posRel === 3 &&
      this.gemSecondary.posY < gemStorage.height(this.gemSecondary.col + 1)
    ) {
      this.gemPrimary.moveHorizontal(
        "right",
        gemStorage.height(this.gemSecondary.col)
      );
      this.gemSecondary.moveHorizontal(
        "right",
        gemStorage.height(this.gemSecondary.col + 1)
      );
    } else if (
      this.gemSecondary.posRel === 3 &&
      this.gemPrimary.posY < gemStorage.height(this.gemPrimary.col + 1)
    ) {
      this.gemPrimary.moveHorizontal(
        "right",
        gemStorage.height(this.gemPrimary.col + 1)
      );
      this.gemSecondary.moveHorizontal(
        "right",
        gemStorage.height(this.gemPrimary.col)
      );
    } else if (this.gemPrimary.posRel !== 3 && this.gemSecondary.posRel !== 3) {
      this.moveHorizontal("right", gemStorage);
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
