# Gem Battle

[Live Link](https://jeffdam.github.io/gem_battle/)

## Background and Overview
Gem Battle is a two-player game in which players battle each other with the goal of overpowering their opponent. 

Pairs of gems are sent down from the drop alley at the top of the screen. Similar to tetris, players can rotate the gems counter-clockwise or clockwise and can move them left and right to position the landing spot of the gems. The gems can be any mixture of four colors. Randomly during the round, gems are replaced with crash orbs. When crash orbs land and come into contact with the gems of the same color, it clears the imediate same-colored gems and any other same-colored gems that are linked from the playing field. The number of gems that are cleared are then sent to the oponent. A player loses when their drop alley is blocked from gems stacking too high and blocking the openning. 

This game is inspired by the classic arcade game [Super Puzzle Fighter II Turbo](https://strategywiki.org/wiki/Super_Puzzle_Fighter_II_Turbo/Walkthrough). 

## Functionality
- Players can press q/w or ,/. keys to rotate their gem pair clockwise/counter-clockwise.
- Players can press left/right or d/g keys to move their gem pair left or right.
- Players can press f or down keys to immediately drop their gem pairs.
- Gems are randomly generated with a combination of four colors of orbs and gems. Both players receive same gem pairs in the same order.
- Every 25th gem pair includes a rainbow gem. Whichever gem the rainbow gem lands on, the rainbow gem will clear all of the gems of the same color. 
- The game is over when one player blocks their drop alley.
- Attack gems contain a counter starting at 5. The counter decreases by one for every normal set of falling gem pairs that are placed in the recipient's play field.
- Players can choose their character that determines their attack gem pattern.

## MVP Features
- [ ] Basic visuals and an interactive interface
- [ ] Basic game mechanics (gems randomly generate, attack gems are sent when gems are cleared, counter gem, etc.)
- [ ] Users can move gem pairs
- [ ] Users can choose their charcter that determines their attack pattern
- [ ] Game ends when a player blocks their drop alley

## Architecture and Technologies
- Vanilla JavaScript for game logic.
- HTML5 Canvas for rendering.
- Howler.js (or HTML audio player) for game background music.
- Webpack to bundle various scripts into a single source.

## Implementation Timeline
### Wednesday
- [ ] Research and create proposal
- [ ] Create project skeleton
- [ ] Research canvas and javascript 
### Thursday
- [ ] Wireframe game page with playing field
- [ ] Complete game page
- [ ] Start coding game logic
### Friday
- [ ] Continue coding game logic
- [ ] Start creating game play visuals
### Saturday
- [ ] Finish coding game logic
- [ ] Finish visuals
### Sunday
- [ ] Finish styling
- [ ] Finish MVPs
- [ ] Fix bugs