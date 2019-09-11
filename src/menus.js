export const startGameMenu = (ctx, ctxNextGem, ctxScoreboard, gameStart, ctxMenu) => {  
  ctxMenu.font = "24px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctxMenu.fillStyle = "black";
  ctxMenu.fillRect(5,5,window.innerWidth-10,window.innerHeight-10);
  ctxMenu.textAlign = "center";
  ctxMenu.fillStyle = "white";

  const xPos = (window.innerWidth/2) ;
  const linePosYStart = 125;
  const subLines = (lineNum) => (linePosYStart + (lineNum * 30));

  ctxMenu.fillText("Welcome to", xPos, 40, 280);
  ctxMenu.font = "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctxMenu.fillText("Gem Battle!", xPos, 75, 280);

  ctxMenu.font = "20px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctxMenu.fillText("Clear as many gems as you can!", xPos, subLines(0), 280);
  ctxMenu.fillText("Use left arrow to move left.", xPos, subLines(1), 280);
  ctxMenu.fillText("Use right arrow to move right.", xPos, subLines(2), 280);
  ctxMenu.fillText("Use down arrow to hard drop.", xPos, subLines(3), 280);
  ctxMenu.fillText("Use 'z' to rotate clockwise.", xPos, subLines(4), 280);
  ctxMenu.fillText("Use 'x' to rotate counter-clockwise.", xPos, subLines(5), 280);

  ctxMenu.fillText("Place similar colored gems next", xPos, subLines(7), 280);
  ctxMenu.fillText("to each other. Use the round gems", xPos, subLines(8), 280);
  ctxMenu.fillText("to clear the same colored gems.", xPos, subLines(9), 280);
  ctxMenu.fillText("The game is over when the drop", xPos, subLines(10), 280);
  ctxMenu.fillText("alley is blocked.", xPos, subLines(11), 280);

  ctxMenu.font = "30px 'Permanent Marker','Sedgwick Ave Display', Helvetica, sans-serif";
  ctxMenu.fillText("Press Enter to Start", xPos, subLines(13), 280);

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

