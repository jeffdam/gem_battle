import { startGameMenu, endGameMenu } from "./menus";
import GemStorage from './gemStorage';
import GemPair from './gemPair';
import ScoreBoard from './scoreBoard';


class Game {
  constructor(ctx, ctxScoreboard, ctxNextGem, ctxMenu) {
    this.ctx = ctx;
    this.ctxMenu = ctxMenu;
    this.ctxNextGem = ctxNextGem;
    this.scoreBoard = new ScoreBoard(ctxScoreboard);
    this.gemCount = 0;
    this.gemLevel = 15;
    this.gemVel = 1;
    this.gemPairLive = undefined;
    this.gemPairStaging = new GemPair(this.ctxNextGem, this.gemVel);
    this.gemStorage = new GemStorage(this.ctx);
    this.renderCycle = this.renderCycle.bind(this);
    this.gameStart = this.gameStart.bind(this);
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
            this.gemPairLive.moveLeft(this.gemStorage);
            break;
          case "Right": // IE/Edge specific value
          case "ArrowRight":
            this.gemPairLive.moveRight(this.gemStorage);
            break;
          case "z": // Rotate Clockwise
            this.gemPairLive.rotateCW(this.gemStorage);
            break;
          case "x": // Rotate Counter-clockwise
            this.gemPairLive.rotateCCW(this.gemStorage);
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
          this.gemPairLive.hardDrop(this.gemStorage);
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
    this.gemPairStaging.goLive(this.ctx);
    this.gemPairLive = this.gemPairStaging;
    this.gemPairStaging = new GemPair(this.ctxNextGem, this.gemVel);
  }

  renderGemPair() {
    this.handleKeyEvent();
    this.handleDownArrowKeyEvent();
    if (!this.gemPairLive) {
      this.moveStagingToLive();
    }
    this.gemPairLive.render(this.gemStorage);
  }

  updateScore() {
    return (score) => {
      this.scoreBoard.update(score);
    };
  }

  isGameOver() {
    if (this.gemStorage.height(3) < -50) {
      endGameMenu(this.ctx, this.scoreBoard.get(), this.gameStart);
    } else {
      this.scoreBoard.update(10);
      this.gemCount++;
      this.renderCycle();
    }
  }

  renderCycle() {
    let id = requestAnimationFrame(this.renderCycle);
    this.ctx.clearRect(0, 0, 300, 650);
    this.ctxNextGem.clearRect(0, 0, 300, 650);
    this.scoreBoard.render();
    this.gemStorage.render();
    this.gemPairStaging.renderStaging();
    this.renderGemPair();

    if (this.gemPairLive.hasStopped()) {
      cancelAnimationFrame(id);

      this.gemStorage.update(
        this.gemPairLive.getGems(),
        this.updateScore()
      );
      this.moveStagingToLive();

      if (this.gemCount % this.gemLevel === 0) {
        this.gemVel++;
        this.gemLevel += 25;
      }

      this.isGameOver();
    }
  }

  gameRender() {
    startGameMenu(this.gameStart);
  }

  gameStart() {
    if (this.gemPairLive) this.reset();
    this.handleDownArrowKeyEvent();
    this.renderCycle();
  }

  reset() {
    this.gemCount = 0;
    this.gemVel = 1;
    this.gemPairLive = undefined;
    this.gemPairStaging = new GemPair(this.ctxNextGem, this.gemVel);
    this.gemStorage = new GemStorage(this.ctx);
    this.score = 0;
  }
}

export default Game;