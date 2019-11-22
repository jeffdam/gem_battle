import GemNull from "./gemNull";

class GemStorage {
  constructor(ctx) {
    this.gemNull = new GemNull(ctx);
    this.gemStorage = [
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull],
      [this.gemNull]
    ];
  }

  get() {
    return this.gemStorage;
  }

  store(gemPrimary, gemSecondary) {
    const gems =
      gemPrimary.posRel === 2
        ? [gemPrimary, gemSecondary]
        : [gemSecondary, gemPrimary];

    gems.forEach(gem => {
      switch (gem.posX) {
        case 0:
          this.gemStorage[0].push(gem);
          break;
        case 50:
          this.gemStorage[1].push(gem);
          break;
        case 100:
          this.gemStorage[2].push(gem);
          break;
        case 150:
          this.gemStorage[3].push(gem);
          break;
        case 200:
          this.gemStorage[4].push(gem);
          break;
        case 250:
          this.gemStorage[5].push(gem);
          break;
      }
    });
  }

  height(col) {
    if (this.gemStorage[col]) {
      const highestGem = this.gemStorage[col][this.gemStorage[col].length - 1];
      return highestGem.posY - 50;
    } else {
      return 0;
    }
  }

  render() {
    this.gemStorage.forEach(col => {
      col.forEach(gem => {
        gem.render();
      });
    });
  }
}

export default GemStorage;
