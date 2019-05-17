const Gems = require('./gems')

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.renderGem = this.renderGem.bind(this);
    this.gems = [new Gems({ pos: { x: 150, y: 0 }, gemImages: this.randomGemImages(), prevHeight:600 })];
    this.gemsFalling = false;
  }

  randomGemImages() {
    const gemImages = [
      { color: "blue", imgSrc: "../assets/images/cat.png" },
      { color: "red", imgSrc: "../assets/images/cat.png" },
      { color: "green", imgSrc: "../assets/images/cat.png" },
      { color: "yellow", imgSrc: "../assets/images/cat.png" },
      // { color: "blue", imgSrc: "../assets/images/SPF2T_Gem_Blue.png" },
      // { color: "red", imgSrc: "../assets/images/SPF2T_Gem_Red.png" },
      // { color: "green", imgSrc: "../assets/images/SPF2T_Gem_Green.png" },
      // { color: "yellow", imgSrc: "../assets/images/SPF2T_Gem_Yellow.png" },
    ];
    return [gemImages[Math.floor(Math.random() * 4)], gemImages[Math.floor(Math.random() * 4)]];
  }

  renderGem() {
    let id = requestAnimationFrame(this.renderGem);
    this.gems.slice(this.gems.length-1)[0].drop(this.ctx, id);
    this.gems.slice(this.gems.length - 1)[0].moveHorizontal('left');
    this.gems.slice(0, this.gems.length-1).forEach(gem => {
      gem.render(this.ctx);
    });
    if (this.gems.slice(this.gems.length - 1)[0].vel === 0) {
      const prevHeight = (this.gems.slice(this.gems.length - 1)[0].gem1.pos.y - 50);

      this.gems.push(new Gems({ pos: { x: 150, y: 0 }, gemImages: this.randomGemImages(), prevHeight: prevHeight}));
      if (prevHeight > -50) {
        this.renderGem();
      }
    }
  }
  
  gameStart() {
    this.renderGem();
  }
 
}

module.exports = Game;

// window.addEventListener("keydown", function (event) {
//   if (event.defaultPrevented) {
//     return; // Do nothing if the event was already processed
//   }

//   switch (event.key) {
//     case "Down": // IE/Edge specific value
//     case "ArrowDown":
//       // Do something for "down arrow" key press.
//       break;
//     case "Up": // IE/Edge specific value
//     case "ArrowUp":
//       // Do something for "up arrow" key press.
//       break;
//     case "Left": // IE/Edge specific value
//     case "ArrowLeft":
//       // Do something for "left arrow" key press.
//       break;
//     case "Right": // IE/Edge specific value
//     case "ArrowRight":
//       // Do something for "right arrow" key press.
//       break;
//     case "Enter":
//       // Do something for "enter" or "return" key press.
//       break;
//     case "Esc": // IE/Edge specific value
//     case "Escape":
//       // Do something for "esc" key press.
//       break;
//     default:
//       return; // Quit when this doesn't handle the key event.
//   }

//   // Cancel the default action to avoid it being handled twice
//   event.preventDefault();
// }, true);