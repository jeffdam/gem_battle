import GemPrimary from './gemPrimary';
import GemSecondary from './gemSecondary';
import { startGameMenu, endGameMenu } from "./menus";
import GemStorage from './gemStorage';
import GemPair from './gemPair';


class Game {
  constructor(ctx, ctxScoreboard, ctxNextGem, ctxMenu) {
    this.ctx = ctx;
    this.ctxMenu = ctxMenu;
    this.ctxScoreboard = ctxScoreboard;
    this.ctxNextGem = ctxNextGem;

    this.gemCount = 0;
    this.gemLevel = 15;
    this.gemVel = 1;
    this.gemPairLive = undefined;
    this.gemPairStaging = new GemPair(this.ctxNextGem, this.gemVel);
    this.gemStorage = new GemStorage(this.ctx);
    this.score = 0;
    this.renderCycle = this.renderCycle.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.updateScore = this.updateScore.bind(this);
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

  updateScore(score) {
    this.score += score;
  }

  displayScore() {
    this.ctxScoreboard.font =
      "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
    this.ctxScoreboard.strokeStyle = "white";
    this.ctxScoreboard.strokeText(this.score, 10, 40);
  }

  moveStagingToLive() {
    this.gemPairStaging.goLive(this.ctx);
    this.gemPairLive = this.gemPairStaging;
    this.gemPairStaging = new GemPair(this.ctxNextGem, this.gemVel);
  }

  renderGems() {
    this.handleKeyEvent();
    if (!this.gemPairLive) {
      this.moveStagingToLive();
    }
    this.gemPairLive.render(this.gemStorage);
  }

  renderCycle() {
    let id = requestAnimationFrame(this.renderCycle);
    this.ctx.clearRect(0, 0, 300, 650);
    this.ctxNextGem.clearRect(0, 0, 300, 650);
    this.ctxScoreboard.clearRect(0, 0, 300, 650);
    this.gemStorage.render();
    this.gemPairStaging.renderStaging();
    this.renderGems();

    this.displayScore();

    if (this.gemPairLive.hasStopped()) {
      cancelAnimationFrame(id);

      this.gemStorage.update(
        this.gemPairLive.getGems(),
        this.updateScore
      );
      this.moveStagingToLive();

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
