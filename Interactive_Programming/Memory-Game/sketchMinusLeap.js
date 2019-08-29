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

// counter
var selectedCount = 0;
// 2 temporary tiles to be checked and modified
var firstTile;
var secondTile;
// flag for when user can reselect a tile
var wait;
// number of pairs matched
var numPairs = 0;
// number of chances (2 selected tiles = 1 chance)
var numChances = 0;


var leapController;
// hand position
var x = 0;
var y = 0;

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
  // when match occurs
  food_check = loadImage('img/food_check.png');
  food2_check = loadImage('img/food2_check.png');
  cherries_check = loadImage('img/cherries_check.png');
  icepop_check = loadImage('img/icepop_check.png');
  fish_check = loadImage('img/fish_check.png');
  lemonade_check = loadImage('img/lemonade_check.png');
  pizza_check = loadImage('img/pizza_check.png');
  wing_check = loadImage('img/wing_check.png');

  img = [{name: 'food', img: food, check: food_check, count: 2}, {name: 'food2', img: food2, check: food2_check, count: 2}, {name: 'cherries', img: cherries, check: cherries_check, count: 2}, {name: 'icepop', img: icepop, check: icepop_check, count: 2}, {name: 'fish', img: fish, check: fish_check, count: 2}, {name: 'lemonade', img: lemonade, check: lemonade_check, count: 2}, {name: 'pizza', img: pizza, check: pizza_check, count: 2}, {name: 'wing', img: wing, check: wing_check, count: 2}];
}

function setup() {
  // set up our leap controller
  leapController = new Leap.Controller({
    enableGestures: true
  });

  // every time the Leap provides us with hand data we will ask it to run this function
  leapController.loop( handleHandData );

  // handle gestures using a special function as well
  leapController.on("gesture", handleGestures);


  createCanvas(800,650);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);

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
  if (intro) {
    showIntro();
  }
  else {
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
  // ellipse(x, y, 25, 25);
}

class Tile {

  constructor(x,y) {
    this.mystery = mystery;
    this.x = x;
    this.y = y;
    this.w = 126;
    this.selected = false;
    this.match = false;
  }

  display() {
    // display image when tile is selected or has found a match
    if (this.selected && !this.match) {
      image(this.img, this.x, this.y);
    }
    else if (this.match) {
      image(this.check, this.x, this.y);
    }
    else {
      // fill(255);
      // rect(this.x, this.y, this.w, this.w);
      image(this.mystery, this.x, this.y);
    }
  }
}

function mousePressed() {
  handleUserPosition();
}

function resetGame() {
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
  text('Then click on another tile to see if the images match', width/2, 270);
  text('If it is not a match, the cards will flip back.', width/2, 300);
  text('If it is a match, the cards will remain displayed', width/2, 330);
  text('The game ends when all pairs have been found', width/2, 360);
  text('Do a screen tap over over the button to begin', width/2, 390);
  stroke(255);

  // begin button
  if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > 460 && mouseY < 520) {
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

  if (mouseX > width/2 - 90 && mouseX < width/2 + 90 && mouseY > 460 && mouseY < 520) {
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
  console.log("got a gesture ...");
  console.log(gesture.type);
  // if (gesture.type == 'screenTap') {
  //   console.log(gesture);
  //   blobs.push(new Blob(x, y));
  // }
}

function handleHandData(frame) {

  // make sure we have exactly one hand being detected
  if (frame.hands.length == 1) {
    // get the position of this hand
    var handPosition = frame.hands[0].stabilizedPalmPosition;

    // grab the x, y & z components of the hand position
    // these numbers are measured in millimeters
    var hx = handPosition[0];
    var hy = handPosition[1];
    var hz = handPosition[2];

    // x is left-right, y is up-down, z is forward-back
    // for this example we will use x & y to move the circle around the screen
    // let's map the x & y values to screen coordinates
    // note that determining the correct values for your application takes some trial and error!
    x = map(hx, -150, 150, 0, 800);
    y = map(hy,    0, 600, 650,   0);
  }
}

function handleUserPosition() {
  if (intro) {
    if (hover) {
      intro = false;
    }
  }
  else if (!gameover) {
    for (var i = 0; i < tiles.length; i++) {
      if (mouseX > tiles[i].x - 63 && mouseX < tiles[i].x + 63 && mouseY > tiles[i].y - 63 && mouseY < tiles[i].y + 63) {

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
            console.log('chances', numChances);

            // console.log('2 SELECTED');

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
  else {
    if (hover) {
      resetGame();
    }
  }
}
