/*
Point Breakdown:

60 pts: Complete redesign of game's theme and look
20 pts: New car type that goes faster and moves up and down
10 pts: 4 different sound effects for getting hit chosen at random
5 pts: Player can control rocket after it's fired
5 pts: Copyright free music in background

I also asked Jared about my new scoring system, and he said 
that the changes there should be worth 10 points since it's something
completely new to the scoring system

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLEFT, keyRIGHT;