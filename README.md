# Gem Battle

<<<<<<< HEAD
[Live Link](https://jeffdam.github.io/gem_battle/)
=======
[Play Gem Battle](https://jeffdam.github.io/gem_battle/)
>>>>>>> gh-pages

## Background and Overview

Gem Battle is a two-player game in which players battle each other with the goal of overpowering their opponent. 

<<<<<<< HEAD
Pairs of gems are sent down from the drop alley at the top of the screen. Similar to tetris, players can rotate the gems counter-clockwise or clockwise and can move them left and right to position the landing spot of the gems. The gems can be any mixture of four colors. Randomly during the round, gems are replaced with crash gems. When crash gems land and come into contact with the gems of the same color, it clears the imediate same-colored gems and any other same-colored gems that are linked from the playing field. The number of gems that are cleared are then sent to the oponent. A player loses when their drop alley is blocked from gems stacking too high and blocking the openning. 
=======
Pairs of gems are sent down from the drop alley at the top of the screen. Similar to tetris, players can rotate the gems counter-clockwise or clockwise and can move them left and right to position the landing spot of the gems. The gems can be any mixture of four colors. Randomly during the round, gems are replaced with crash gems. When crash gems land and come into contact with the gems of the same color, it clears the imediate same-colored gems and any other same-colored gems that are linked from the playing field. The number of gems that are cleared are then sent to the oponent. A player loses when their drop alley is blocked from gems stacking too high and blocking the openning.
>>>>>>> gh-pages

This game is inspired by the classic arcade game [Super Puzzle Fighter II Turbo](https://strategywiki.org/wiki/Super_Puzzle_Fighter_II_Turbo/Walkthrough).

<<<<<<< HEAD
## Functionality
- Players can press z/x keys to rotate their gem pair clockwise/counter-clockwise.
- Players can press left/right keys to move their gem pair left or right.
- Players can press down keys to immediately drop their gem pairs.
- Gems are randomly generated with a combination of four colors of crash gems and gems. Both players receive same gem pairs in the same order.
- Every 25th gem pair includes a rainbow gem. Whichever gem the rainbow gem lands on, the rainbow gem will clear all of the gems of the same color. 
- The game is over when one player blocks their drop alley.
- Attack gems contain a counter starting at 5. The counter decreases by one for every normal set of falling gem pairs that are placed in the recipient's play field.
- Players can choose their character that determines their attack gem pattern.

## MVP Features
- [ ] Basic visuals and an interactive interface
- [ ] Basic game mechanics (gems randomly generate, attack gems are sent when gems are cleared, counter gem, etc.)
- [ ] Users can move gem pairs
- [ ] Game ends when a player blocks their drop alley
=======
<img src="./assets/images/readme_img/start.gif" width="80%">
>>>>>>> gh-pages

## Architecture and Technologies

- Vanilla JavaScript for game logic.
- HTML5 Canvas for rendering.
- Webpack to bundle various scripts into a single source.

## Functionality

### HTML5 Canvas Animation

Using features of Canvas such as requestAnimationFrame (for optimized browser animation), the game and objects within are constantly being redrawn and re-rendered according to player input and positions of the gems.

### Controls

Players can press z/x keys to rotate their gem pair clockwise/counter-clockwise. Players can press left/right keys to move their gem pair left or right. Players can press down keys to immediately drop their gem pairs.

### Display

Gems are generated with a random combination of four colors of crash gems and gems. Players can see the upcoming gems in the gem staging area.

<img src="./assets/images/readme_img/gem_staging.gif" width="40%">

### Gameplay

The game is over when one player blocks their drop alley.

<img src="./assets/images/readme_img/game_over.gif" width="80%">