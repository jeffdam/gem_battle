import GemPrimary from './gemPrimary';
import GemSecondary from './gemSecondary';
import { startGameMenu, endGameMenu } from "./menus";
import GemStorage from './gemStorage';

class Game {
  constructor(ctx, ctxScoreboard, ctxNextGem, ctxMenu) {
    this.ctx = ctx;
    this.ctxMenu = ctxMenu;
    this.ctxScoreboard = ctxScoreboard;
    this.ctxNextGem = ctxNextGem;

    this.gemCount = 0;
    this.gemLevel = 15;
    this.gemVel = 1;
    this.gemPrimaryLive = undefined;
    this.gemSecondaryLive = undefined;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem, this.gemVel);
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem, this.gemVel);
    this.gemStorage = new GemStorage(this.ctx);
    this.score = 0;
    this.renderCycle = this.renderCycle.bind(this);
    this.gameStart = this.gameStart.bind(this);
  }

  moveHorizontal(direction) {
    if (direction === "left") {
      this.gemPrimaryLive.moveHorizontal(
        "left",
        this.gemStorage.height(this.gemPrimaryLive.col - 1)
      );
      this.gemSecondaryLive.moveHorizontal(
        "left",
        this.gemStorage.height(this.gemSecondaryLive.col - 1)
      );
    } else {
      this.gemPrimaryLive.moveHorizontal(
        "right",
        this.gemStorage.height(this.gemPrimaryLive.col + 1)
      );
      this.gemSecondaryLive.moveHorizontal(
        "right",
        this.gemStorage.height(this.gemSecondaryLive.col + 1)
      );
    }
  }

  rotate(direction) {
    this.gemPrimaryLive.rotate(direction);
    this.gemSecondaryLive.rotate(direction);
  }

  rotateCW() {
    let adjColHeight;
    switch (this.gemSecondaryLive.posRel) {
      case 0:
        adjColHeight = this.gemStorage.height(this.gemSecondaryLive.col + 1) - 50;
        if (this.gemSecondaryLive.posY < adjColHeight) {
          this.rotate("cw");
        }
        break;
      case 1:
        adjColHeight = this.gemStorage.height(this.gemSecondaryLive.col - 1) - 50;
        if (
          this.gemSecondaryLive.posY <
            this.gemStorage.height(this.gemSecondaryLive.col) &&
          this.gemSecondaryLive.posY < adjColHeight
        ) {
          this.rotate("cw");
        }
        break;
      case 2:
        adjColHeight = this.gemStorage.height(this.gemSecondaryLive.col - 1);
        if (this.gemSecondaryLive.posY < adjColHeight) {
          this.rotate("cw");
        }
        break;
      case 3:
        this.rotate("cw");
        break;
    }
  }

  rotateCCW() {
    let adjColHeight;
    switch (this.gemSecondaryLive.posRel) {
      case 0:
        adjColHeight = this.gemStorage.height(this.gemSecondaryLive.col - 1) - 50;
        if (this.gemSecondaryLive.posY < adjColHeight) {
          this.rotate("ccw");
        }
        break;
      case 1:
        this.rotate("ccw");
        break;
      case 2:
        adjColHeight = this.gemStorage.height(this.gemSecondaryLive.col + 1);
        if (this.gemSecondaryLive.posY < adjColHeight) {
          this.rotate("ccw");
        }
        break;
      case 3:
        adjColHeight = this.gemStorage.height(this.gemSecondaryLive.col + 1) - 50;
        if (
          this.gemSecondaryLive.posY <
            this.gemStorage.height(this.gemSecondaryLive.col) &&
          this.gemSecondaryLive.posY < adjColHeight
        ) {
          this.rotate("ccw");
        }
        break;
    }
  }

  checkCrashGems(scoreBonus) {
    const deleteArr = [[], [], [], [], [], []], remove = [];
    const gemStorage = this.gemStorage.get();
    gemStorage.forEach((col, colNum) => {
      col.forEach((gem, rowNum) => {
        if (gem.type === "crash") {
          remove.push(...this.checkNeighbors(colNum, rowNum, gem.color));
        }
      });
    });
    this.score += 50 * remove.length * scoreBonus;
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
    const gemStorage = this.gemStorage.get();
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
        remove.push({col, row});
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

  handleCrashGems(scoreBonus = 1) {
    let clearedAllValidCrashGems = true;
    const deleteArr = this.checkCrashGems(scoreBonus);
    const gemStorage = this.gemStorage.get();
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
      this.handleCrashGems(scoreBonus + 1);
    }
  }

  handleKeyEvent() {
    window.addEventListener(
      "keydown",
      event => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        switch (event.key) {
          case "Left": // IE/Edge specific value
          case "ArrowLeft":
            if (
              this.gemPrimaryLive.posRel === 1 &&
              this.gemSecondaryLive.posY <
                this.gemStorage.height(this.gemSecondaryLive.col - 1)
            ) {
              this.gemPrimaryLive.moveHorizontal(
                "left",
                this.gemStorage.height(this.gemSecondaryLive.col)
              );
              this.gemSecondaryLive.moveHorizontal(
                "left",
                this.gemStorage.height(this.gemSecondaryLive.col - 1)
              );
            } else if (
              this.gemSecondaryLive.posRel === 1 &&
              this.gemPrimaryLive.posY <
                this.gemStorage.height(this.gemPrimaryLive.col - 1)
            ) {
              this.gemPrimaryLive.moveHorizontal(
                "left",
                this.gemStorage.height(this.gemPrimaryLive.col - 1)
              );
              this.gemSecondaryLive.moveHorizontal(
                "left",
                this.gemStorage.height(this.gemPrimaryLive.col)
              );
            } else if (
              this.gemPrimaryLive.posRel !== 3 &&
              this.gemSecondaryLive.posRel !== 3
            ) {
              this.moveHorizontal("left");
            }
            break;
          case "Right": // IE/Edge specific value
          case "ArrowRight":
            if (
              this.gemPrimaryLive.posRel === 3 &&
              this.gemSecondaryLive.posY <
                this.gemStorage.height(this.gemSecondaryLive.col + 1)
            ) {
              this.gemPrimaryLive.moveHorizontal(
                "right",
                this.gemStorage.height(this.gemSecondaryLive.col)
              );
              this.gemSecondaryLive.moveHorizontal(
                "right",
                this.gemStorage.height(this.gemSecondaryLive.col + 1)
              );
            } else if (
              this.gemSecondaryLive.posRel === 3 &&
              this.gemPrimaryLive.posY <
                this.gemStorage.height(this.gemPrimaryLive.col + 1)
            ) {
              this.gemPrimaryLive.moveHorizontal(
                "right",
                this.gemStorage.height(this.gemPrimaryLive.col + 1)
              );
              this.gemSecondaryLive.moveHorizontal(
                "right",
                this.gemStorage.height(this.gemPrimaryLive.col)
              );
            } else if (
              this.gemPrimaryLive.posRel !== 3 &&
              this.gemSecondaryLive.posRel !== 3
            ) {
              this.moveHorizontal("right");
            }
            break;
          case "z": // Rotate Clockwise
            this.rotateCW();
            break;
          case "x": // Rotate Counter-clockwise
            this.rotateCCW();
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }
        event.preventDefault();
      },
      true
    );
  }

  handleDownArrowKeyEvent() {
    const handleDownArrow = event => {
      if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
          this.gemPrimaryLive.hardDrop(this.gemStorage.height(this.gemPrimaryLive.col));
          this.gemSecondaryLive.hardDrop(
            this.gemStorage.height(this.gemSecondaryLive.col)
          );
          break;
        default:
          return;
      }
      event.preventDefault();
      window.removeEventListener("keydown", handleDownArrow, true);
    };

    window.addEventListener("keydown", handleDownArrow, true);
  }

  moveStagingToLive() {
    this.gemPrimaryStaging.goLive(this.ctx);
    this.gemPrimaryLive = this.gemPrimaryStaging;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem, this.gemVel);
    this.gemSecondaryStaging.goLive(this.ctx);
    this.gemSecondaryLive = this.gemSecondaryStaging;
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem, this.gemVel);
  }

  renderStaging() {
    this.gemPrimaryStaging.render();
    this.gemSecondaryStaging.render();
  }

  renderGems() {
    this.handleKeyEvent();

    if (!this.gemPrimaryLive) {
      this.moveStagingToLive();
    }

    this.gemSecondaryLive.drop(this.gemStorage.height(this.gemSecondaryLive.col));
    this.gemPrimaryLive.drop(this.gemStorage.height(this.gemPrimaryLive.col));
    if (this.gemPrimaryLive.vel === 0) {
      this.gemSecondaryLive.updateOtherVel();
    } else if (this.gemSecondaryLive.vel === 0) {
      this.gemPrimaryLive.updateOtherVel();
    }
  }

  updateScore() {
    this.ctxScoreboard.font =
      "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
    this.ctxScoreboard.strokeStyle = "white";
    this.ctxScoreboard.strokeText(this.score, 10, 40);
  }

  renderCycle() {
    let id = requestAnimationFrame(this.renderCycle);
    this.ctx.clearRect(0, 0, 300, 650);
    this.ctxNextGem.clearRect(0, 0, 300, 650);
    this.ctxScoreboard.clearRect(0, 0, 300, 650);
    this.gemStorage.render();
    this.renderStaging();
    this.renderGems();

    this.updateScore();

    if (this.gemPrimaryLive.vel === 0 && this.gemSecondaryLive.vel === 0) {
      cancelAnimationFrame(id);

      this.gemStorage.store(this.gemPrimaryLive, this.gemSecondaryLive);
      this.moveStagingToLive();

      this.handleCrashGems();

      if (this.gemCount % this.gemLevel === 0) {
        this.gemVel++;
        this.gemLevel += 25;
      }

      if (this.gemStorage.height(3) >= -50) {
        this.score += 10;
        this.gemCount++;
        this.handleDownArrowKeyEvent();
        this.renderCycle();
      } else {
        endGameMenu(this.ctx, this.score, this.gameStart);
      }
    }
  }

  gameRender() {
    startGameMenu(this.gameStart);
  }

  gameStart() {
    if (this.gemPrimaryLive) this.reset();
    this.handleDownArrowKeyEvent();
    this.renderCycle();
  }

  reset() {
    this.gemCount = 0;
    this.gemVel = 1;
    this.gemPrimaryLive = undefined;
    this.gemSecondaryLive = undefined;
    this.gemPrimaryStaging = new GemPrimary(this.ctxNextGem, this.gemVel);
    this.gemSecondaryStaging = new GemSecondary(this.ctxNextGem, this.gemVel);
    this.gemStorage = new GemStorage(this.ctx);
    this.score = 0;
  }
}

export default Game;
