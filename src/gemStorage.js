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

  update(gemPrimary, gemSecondary, updateScore) {
    this.store(gemPrimary, gemSecondary);
    this.handleCrashGems(updateScore);
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

  handleCrashGems(updateScore, scoreBonus = 1) {
    let clearedAllValidCrashGems = true;
    const deleteArr = this.checkCrashGems(updateScore, scoreBonus);
    const gemStorage = this.gemStorage;
    for (let col = 0; col < 6; col++) {
      if (deleteArr[col].length > 0) {
        clearedAllValidCrashGems = false;
      }
      gemStorage[col] = gemStorage[col].filter(
        (gem, gemIdx) => !deleteArr[col].includes(gemIdx)
      );
    }
    gemStorage.forEach(col => {
      col.forEach((gem, idx) => {
        if (idx > 0 && gem.posY < col[idx - 1].posY - 50) {
          gem.updatePosY(col[idx - 1].posY - 50);
        }
      });
    });
    if (!clearedAllValidCrashGems) {
      this.handleCrashGems(updateScore, scoreBonus + 1);
    }
  }

  checkCrashGems(updateScore, scoreBonus) {
    const deleteArr = [[], [], [], [], [], []],
      remove = [];
    const gemStorage = this.gemStorage;
    gemStorage.forEach((col, colNum) => {
      col.forEach((gem, rowNum) => {
        if (gem.type === "crash") {
          remove.push(...this.checkNeighbors(colNum, rowNum, gem.color));
        }
      });
    });
    updateScore(50 * remove.length * scoreBonus);
    remove.forEach(gem => {
      deleteArr[gem.col].push(gem.row);
    });

    return deleteArr;
  }

  checkNeighbors(col, row, color) {
    const direction = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1]
    ];
    const seen = {};
    const gemStorage = this.gemStorage;
    const remove = [];
    helper(col, row);

    function helper(col, row) {
      if (
        seen[`${col}#${row}`] ||
        !gemStorage[col][row] ||
        gemStorage[col][row].color !== color
      )
        return;
      seen[`${col}#${row}`] = true;
      if (gemStorage[col][row].color === color) {
        remove.push({ col, row });
      }
      direction.forEach(dir => {
        let adjCol = col + dir[0],
          adjRow = row + dir[1];
        if (adjCol >= 0 && adjCol <= 5 && !seen[`${adjCol}#${adjRow}`]) {
          helper(adjCol, adjRow);
        }
      });
    }

    return remove.length > 1 ? remove : [];
  }
}

export default GemStorage;
