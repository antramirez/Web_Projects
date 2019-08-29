// game states
var intro = true;
var gameover = false;

// array to contain tile objects
var tiles = [];

// images
var mystery, food, food2, cherries, icepop, fish, lemonade, pizza, wing;
var food_check, food2_check, cherries_check, icepop_check, fish_check, lemonade_check, pizza_check, wing_check;
// array to hold image objects
var img = [];

// selected tile counter
var selectedCount = 0;
// 2 temporary tiles to be checked and modified
var firstTile;
var secondTile;
// flag for when user can't reselect a tile
var wait;
// number of pairs matched
var numPairs = 0;
// number of chances (2 selected tiles = 1 chance)
var numChances = 0;

// Leap Motion controller
var leapController;

// hand position mapped to screen
var x = 400;
var y = 325;

// start button hover state
var hover = false;

function preload() {
  // initial tile image
  mystery = loadImage('img/mystery.png');
  // selected tile image
  food = loadImage('img/food.png');
  food2 = loadImage('img/food2.png');
  cherries = loadImage('img/cherries.png');
  icepop = loadImage('img/icepop.png');
  fish = loadImage('img/fish.png');
  lemonade = loadImage('img/lemonade.png');
  pizza = loadImage('img/pizza.png');
  wing = loadImage('img/wing.png');
  // images for when match occurs
  food_check = loadImage('img/food_check.png');
  food2_check = loadImage('img/food2_check.png');
  cherries_check = loadImage('img/cherries_check.png');
  icepop_check = loadImage('img/icepop_check.png');
  fish_check = loadImage('img/fish_check.png');
  lemonade_check = loadImage('img/lemonade_check.png');
  pizza_check = loadImage('img/pizza_check.png');
  wing_check = loadImage('img/wing_check.png');

  // array of image objects
  img = [{name: 'food', img: food, check: food_check, count: 2}, {name: 'food2', img: food2, check: food2_check, count: 2}, {name: 'cherries', img: cherries, check: cherries_check, count: 2}, {name: 'icepop', img: icepop, check: icepop_check, count: 2}, {name: 'fish', img: fish, check: fish_check, count: 2}, {name: 'lemonade', img: lemonade, check: lemonade_check, count: 2}, {name: 'pizza', img: pizza, check: pizza_check, count: 2}, {name: 'wing', img: wing, check: wing_check, count: 2}];
}

function setup() {
  /* leap controller set up code by Craig Kapp */
  // set up our leap controller
  leapController = new Leap.Controller({
    enableGestures: true
  });

  // every time the Leap provides us with hand data we will ask it to run this function
  leapController.loop(handleHandData);

  // handle gestures using a special function as well
  leapController.on("gesture", handleGestures);

  createCanvas(800,650);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  noCursor();
  fill(255);
  stroke(255,0,0);

  /// create new tiles
  for (var i = 208; i < 652; i += 128) {
    for (var j = 108; j < 552; j += 128) {
      tiles.push(new Tile(i,j))
    }
  }
  // set images to tiles
  fillTiles();
}

function draw() {
  background(0);
  // determine game state
  if (intro) {
    showIntro();
  }
  else {
    // display tiles and score
    if (!gameover) {
      for (var i = 0; i < tiles.length; i++) {
        tiles[i].display();
      }
      showScore();
    }
    // show game over screen
    else {
      showGameOverScreen();
    }
  }
  // draw eclipse wherever your finger is
  ellipse(x, y, 25, 25);
}

class Tile {
  constructor(x,y) {
    this.mystery = mystery; // question mark image
    this.x = x;
    this.y = y;
    this.w = 126;
    this.selected = false;
    this.match = false;
  }

  display() {
    // display appropriate image
    if (this.selected && !this.match) {
      image(this.img, this.x, this.y);
    }
    else if (this.match) {
      image(this.check, this.x, this.y);
    }
    else {
      image(this.mystery, this.x, this.y);
    }
  }
}

function resetGame() {
  // reset game states and reset tiles
  gameover = false;
  selectedCount = 0;
  numChances = 0;
  numPairs = 0;
  resetImgCount();
  fillTiles();
}

function fillTiles() {
  // assign each tile a name and image
  for (var i = 0; i < tiles.length; i++) {
    // reset booleans
    tiles[i].selected = false;
    tiles[i].match = false;

    // get random index and assign current tile an image
    var index = Math.floor(random(0,img.length));

    // get a new index if count at img[index] is 0 to avoid repeats
    while (img[index].count == 0) {
      index = Math.floor(random(0,img.length));
    }

    // set tile images and name
    tiles[i].img = img[index].img;
    tiles[i].check = img[index].check;
    tiles[i].name = img[index].name;

    // decrement count
    img[index].count--;
  }
}

function resetImgCount() {
  for (var i = 0; i < img.length; i++) {
    img[i].count = 2;
  }
}

function showIntro() {
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(48);
  text('FOOD MEMORY', width/2, 120);
  textSize(20);
  text('The objective of this game is to find every pair of matching tiles.', width/2, 180);
  text('Hover over the tile you wish to reveal with your finger', width/2, 210);
  text('and do a screen tap gesture to click on it.', width/2, 240);
  text('Then click on another tile to see if the images match.', width/2, 270);
  text('If it is not a match, the cards will flip back.', width/2, 300);
  text('If it is a match, the cards will remain displayed.', width/2, 330);
  text('The game ends when all pairs have been found.', width/2, 360);
  text('Do a screen tap over the button below to begin.', width/2, 390);
  stroke(255);

  // begin button hover states
  if (x > width/2 - 75 && x < width/2 + 75 && y > 460 && y < 520) {
    hover = true;
    fill(100,100,255);
    rect(width/2, 490, 150, 60);
    noStroke();
    fill(0);
    text('BEGIN', width/2, 498);
  }
  else {
    hover = false;
    noFill();
    rect(width/2, 490, 150, 60);
    fill(255);
    text('BEGIN', width/2, 498);
  }
  textSize(14);
  fill(255);
  noStroke();
  text('Note: this game only works with a Leap Motion controller', width/2, 600)
}

function showScore() {
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text('Chances: ' + numChances, 145, height - 50);
  textAlign(RIGHT);
  text('Pairs matched: ' + numPairs, 652, height - 50);
}

function showGameOverScreen() {
  fill(0,255,0);
  noStroke();
  textAlign(CENTER);
  textSize(36);
  text('GAME OVER', width/2, height/2-50);
  textSize(24);
  text('It took you ' + numChances + ' chances', width/2, height/2);
  text('Success rate: ' + int(numPairs/numChances*100) + '%', width/2, height/2+30);
  stroke(255);

  // user finger is hovering over play again button
  if (x > width/2 - 90 && x < width/2 + 90 && y > 460 && y < 520) {
    hover = true;
    fill(0,255,0);
    rect(width/2, 490, 180, 60);
    noStroke();
    fill(0);
    text('PLAY AGAIN', width/2, 498);
  }
  else {
    hover = false;
    noFill();
    rect(width/2, 490, 180, 60);
    fill(255);
    text('PLAY AGAIN', width/2, 498);
  }
}

// leap controller functions
function handleGestures(gesture) {
  if (gesture.type == 'screenTap') {
    handleUserPosition();
  }
}

function handleHandData(frame) {
  // make sure we have exactly one hand being detected
  if (frame.hands.length == 1) {
    // get the position of this hand
    var handPosition = frame.hands[0].stabilizedPalmPosition;

    // grab the x and y of hand in real life
    var hx = handPosition[0];
    var hy = handPosition[1];

    // map finger position with eclipse position on screen
    x = map(hx, -150, 150, 0, 800);
    y = map(hy,   30, 400, 650,   0);
  }
}

// this function will be called wherever there is a finger tap
function handleUserPosition(device) {
  if (intro) {
    if (hover) {
      intro = false;
    }
  }
  else if (!gameover) {
    for (var i = 0; i < tiles.length; i++) {
      // finger is over a tile
      if ( x > tiles[i].x - 63 && x < tiles[i].x + 63 && y > tiles[i].y - 63 && y < tiles[i].y + 63) {

        // first turn
        if (selectedCount == 0) {
          tiles[i].selected = true;
          selectedCount++;
          firstTile = tiles[i];
        }
        // even number turn
        else if (selectedCount !== 0 && selectedCount % 2 === 0) {
          // if there are not already 2 tiles on the screen,
          // select current tile
          if (!wait) {
            tiles[i].selected = true;
            firstTile = tiles[i];
            selectedCount++;
          }
        }
        // odd number turn
        else {
          if (!tiles[i].selected) {
            // increase counter
            numChances++;

            // increase selected count and set boolean
            selectedCount++;
            tiles[i].selected = true;

            // because this is an even number turn,
            // set secondTile to current tile
            secondTile = tiles[i];

            // check for match
            if (secondTile.name == firstTile.name) {
              // increase pairs
              numPairs++;
              // check for game over
              if (numPairs === 8) {
                setTimeout(function() {
                  gameover = true;
                }, 400);
              }
              // set tile states
              firstTile.match = true;
              secondTile.match = true;
            }
            // if no match, reset tiles
            else {
              // flag to check when there are 2
              // selected tiles displayed
              wait = true;

              // once 2 tiles are selected, unselect them after some
              // time and reset flag so other tiles can now be selected
              setTimeout(function(){
                firstTile.selected = false;
                secondTile.selected = false;
                wait = false;
              }, 700);
            }
          }
        }
      }
    }
  }
  // game over
  else {
    if (hover) {
      // reset game if user screen taps over button
      resetGame();
    }
  }
}
