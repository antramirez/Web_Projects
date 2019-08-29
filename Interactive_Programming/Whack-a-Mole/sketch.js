// images
let kav, glove, whack, missImg;
// mole array
let moles = [];

// sounds
let whackSound, missSound;

// game states
let intro = true;
let play = false;
let end = false;

// background and stroke variables
let bg = 255;
let str = 0;

// game variables
let hits = 0;
let misses = 0;
let timeLeft = 3000;

// hit detection
let miss = false;

// time
let time;
let timeRemaining;
let timePassed;
// timer to start at 33 seconds
let totalTime = 32;

function preload() {
  // preload images and sounds
  kav = loadImage('img/kav.png');
  glove = loadImage('img/glove.png');
  whack = loadImage('img/whack.png');
  missImg = loadImage('img/X.png');
  whackSound = loadSound('sound/whackSound.mp3');
  missSound = loadSound('sound/missSound.mp3');
}

function setup() {
  // parent the canvas
  let canvas = createCanvas(533,533);
  canvas.parent('#game');
  background(0);

  // instantiate moles and add them to array
  for (let i = 117; i < width; i+=150) {
    for (let j = 117; j < height; j+=150) {
      moles.push(new Mole(j,i));
    }
  }
}

function draw() {
  // show instructions in intro state
  if (intro) {
    background(bg);
    showInstructions();
  }
  if (play) {
    time = int(millis()/1000);
    // transition white screen to black
    bg -= 2;
    if (bg < 0) {
      bg = 0;
      background(bg);
      noCursor();
      // display moles
      for (let i = 0; i < moles.length; i++) {
        moles[i].display();
      }
      // show text
      showScore();
      showTimeLeft();
    }
    else {
      // display white screen with instructions until bg is 0 (black)
      background(bg);
      showInstructions();
    }
  }
  // show game over after time is up
  if (end) {
    play = false;
    showGameOver();
  }
}

class Mole {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = 100;
    // initial state of mole
    this.state = 'down';
    // get random number of frames to stay in state
    this.framesToStayInState = int(random(100, 350));
    // current frames in state (to be incremented)
    this.framesInState = 0;

  }

  display() {
    // transition stroke color
    stroke(str);
    str++;
    if (str > 255) {
      str = 255;
    }

    strokeWeight(5);
    fill(0);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);

    // show empty ellipse if state is down, show mole otherwise
    if (this.state == 'down') {
      ellipse(this.x, this.y, this.w, this.w);
    }
    else {
      ellipse(this.x, this.y, this.w, this.w);
      image(kav, this.x, this.y, this.w-5, this.w-5);
    }

    if (mouseIsPressed) {
      // check if mouse click is inside mole ellipse and display appropriate image
      if (mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.w/2 && mouseY < this.y + this.w/2) {
        if (miss) {
          image(missImg,mouseX, mouseY, 100, 100);
        }
        else {
          image(whack,mouseX, mouseY, 120, 100);
          // if mole is hit, change state
          this.state = 'down';
        }
      }
    }
    else {
      // display glove if mouse is not pressed
      image(glove,mouseX, mouseY, 50, 83);
    }

    // increase frame state
    this.framesInState += 1;

    // swtich into other state after time is up
    if (this.framesInState >= this.framesToStayInState) {
      if (this.state == 'down') {
        this.state = 'up';
      }
      else {
        this.state = 'down';
      }

      // reset time in state
      this.framesInState = 0;

      // reset time to stay in state
      this.framesToStayInState = int(random(90,250));
    }
  }
}

function showInstructions() {
  // intro text
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Whack-An-Unqualified-Supreme-Court-Justice', width/2, height/2 - 100);
  textSize(16);
  text("It's simple.", width/2, height/2 - 40);
  text("Whack Brett Kavanaugh as many times as you can in 30 seconds.", width/2, height/2);
  text("You get a point every time you click on his face.", width/2, height/2 + 40);
  text("You get a miss every time you click on an empty circle.", width/2, height/2 + 80);
  text("Click to start.", width/2, height/2 + 120);
}

function showScore() {
  fill(255,0,0);
  noStroke();
  textAlign(LEFT);
  textSize(15);
  text('Hits: ' + hits, 15, 20);
  text('Misses: ' + misses, 15, 40);
}

function showTimeLeft() {
  textSize(15);
  textAlign(CENTER, CENTER);
  // get current time passed and time remaining
  time = int(millis()/1000);
  timeRemaining = totalTime - (time - timePassed);
  text('Time left: ' + timeRemaining, width/2, height-30);
  // game over when 30 seconds are up
  if (timeRemaining <= 0) {
    end = true;
  }
}

function showGameOver() {
  // display text when time is up
  background(0);
  fill(255,0,0);
  textAlign(CENTER, CENTER);
  textSize(72);
  text('GAME OVER', width/2, height/2 - 20);
  textSize(36);
  text('Hits: ' + hits, width/2, height/2 + 55);
  text('Misses: ' + misses, width/2, height/2 + 105);
  textSize(18);
  text("Click to play again", width/2, height/2 + 150);
}

function mousePressed() {
  if (intro) {
    // start game if click on intro and get how much time has passed since sketch started
    play = true;
    intro = false;
    timePassed = int(millis()/1000);
  }
  else if (play && bg <= 0) { // full game appears when bg (background color) is 0
    // check for hits on every mole when mouse is pressed
    for (let i = 0; i < moles.length; i++) {
      // check mouse position is within mole radius
      if (mouseX < moles[i].x + moles[i].w/2 && mouseX > moles[i].x - moles[i].w/2 && mouseY > moles[i].y - moles[i].w/2 && mouseY < moles[i].y + moles[i].w/2) {
        // hit if mole is up
        if (moles[i].state === 'up') {
          // reset miss boolean, change image, and update hits tally
          miss = false;
          image(whack,mouseX, mouseY, 120, 100);
          // increment hits
          hits++;
          // play whack sound
          whackSound.play();
        }
        else { // miss if mole is down
          miss = true;
          // increment misses
          misses++;
          // play miss sound
          missSound.play();
        }
      }
    }
  }
  else if (end) {
    // if click after game over, reset game state and time
    end = false;
    play = true;
    hits = 0;
    misses = 0;
    totalTime = 30;
    timePassed = int(millis()/1000);
  }
}
