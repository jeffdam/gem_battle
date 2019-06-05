export const startGameMenu = (ctx, ctxNextGem, ctxScoreboard, gameStart) => {
  ctx.font = "24px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctxNextGem.fillStyle = "black";
  ctxNextGem.fillRect(0, 0, 300, 650);
  ctxScoreboard.fillRect(0, 0, 300, 650);

  ctx.fillRect(0, 0, 300, 650);
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  const linePosYStart = 125;
  const subLines = (lineNum) => (linePosYStart + (lineNum * 30));

  ctx.fillText("Welcome to", 150, 40, 280);
  ctx.font = "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.fillText("Gem Battle!", 150, 75, 280);

  ctx.font = "20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.fillText("Clear as many gems as you can!", 150, subLines(0), 280);
  ctx.fillText("Use left arrow to move left.", 150, subLines(1), 280);
  ctx.fillText("Use right arrow to move right.", 150, subLines(2), 280);
  ctx.fillText("Use down arrow to hard drop.", 150, subLines(3), 280);
  ctx.fillText("Use 'z' to rotate clockwise.", 150, subLines(4), 280);
  ctx.fillText("Use 'x' to rotate counter-clockwise.", 150, subLines(5), 280);

  ctx.fillText("Place similar colored gems next", 150, subLines(7), 280);
  ctx.fillText("to each other. Use the round gems", 150, subLines(8), 280);
  ctx.fillText("to clear the same colored gems.", 150, subLines(9), 280);
  ctx.fillText("The game is over when the drop", 150, subLines(10), 280);
  ctx.fillText("alley is blocked.", 150, subLines(11), 280);

  ctx.font = "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.fillText("Press Enter to Start", 150, subLines(13), 280);

  const handleEnter = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "Enter":
        gameStart();
        break;
      default:
        return;
    }
    event.preventDefault();
    window.removeEventListener("keydown", handleEnter, true);
  };

  window.addEventListener("keydown", handleEnter, true);

};


export const endGameMenu = (ctx, score, gameStart) => {
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, 300, 650);
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 275, 300, 150);
  ctx.fillStyle = "red";
  ctx.font = "40px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", 150, 330);
  ctx.font = "20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`Your score: ${score}`, 150, 365);
  ctx.fillText(`Press Enter to play again`, 150, 395);

  const handleEnter = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "Enter":
        gameStart();
        break;
      default:
        return;
    }
    event.preventDefault();
    window.removeEventListener("keydown", handleEnter, true);
  };

  window.addEventListener("keydown", handleEnter, true);
};

