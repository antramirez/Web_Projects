// speech recognition
var recording = new p5.SpeechRec(); // new P5.SpeechRec object
recording.continuous = true; // do continuous recognition
recording.interimResults = true; // allow partial recognition (faster, less accurate)
var doneListening = false;

// intro
var balloonIcon, balloonIcon2, balloonIcon3, golfIcon;
var thePlayer;
var balloonsSelected = false;
var golfSelected = false;
var balloonsStart = false;
var golfStart = false;

var showBalloonsDifficulty = false;
var balloonsDifficulty;

// balloon variables
var balloonsE = []; // easy
var balloonsM = []; // medium
var balloonsH = []; // hard
var balloonImgs = [];
var ground, sky, rock;
var r1, r2;
// balloonX and y base positions for balloon
var balloonX = 365;
var balloonY = 165;
var arrow1, arrow2;
var cloudImgs = [];
var clouds = [];

var popped = 0;
var balloonsGameOver = false;
var switchToGolf = false;
// var balloonsSelected = true;

var showArrow = true;
var up = true;
var down = false;

var rockUp = true;
var rockDown = false;

var angle1 = false;
var angle2 = false;
var angle3 = false;
var angle4 = false;
var angle5 = false;

var rocksRemaining = 3;
var popSound;
// end balloon variables


// golf variables
// declare array to hold tile images
let tiles = [];
let map = {
  // hole 1 tile mapping
  hole1: [[1, 1, 1, 1, 1, 6, 8, 8, 8, 8, 8, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 7, 4, 7, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 5, 5, 5, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 3, 3, 3, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1]],

  // hole 2 tile mapping
  hole2: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1],
          [6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1, 1],
          [6, 7, 7, 7, 7, 7, 7, 7, 15, 14, 7, 6, 1, 1, 1, 1, 1],
          [6, 7, 7, 7, 7, 6, 7, 7, 12, 13, 7, 6, 1, 1, 1, 1, 1],
          [6, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6],
          [6, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6],
          [6, 7, 7, 7, 7, 6, 7, 15, 14, 7, 7, 7, 7, 7, 4, 7, 6],
          [6, 7, 3, 3, 7, 6, 7, 12, 13, 7, 7, 7, 7, 7, 7, 7, 6],
          [6, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6],
          [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]],

  // hole 3 tile mapping
  hole3: [[1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1],
          [1, 1, 6, 11, 7, 7, 7, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1],
          [1, 1, 6, 7, 7, 15, 14, 7, 7, 7, 3, 7, 6, 1, 1, 1, 1],
          [1, 1, 6, 7, 7, 12, 13, 7, 7, 7, 3, 7, 6, 1, 1, 1, 1],
          [6, 6, 6, 11, 7, 7, 7, 7, 7, 7, 7, 7, 6, 1, 1, 1, 1],
          [6, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6],
          [6, 7, 15, 14, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 11, 6],
          [6, 7, 12, 13, 7, 6, 7, 7, 7, 15, 14, 7, 7, 7, 7, 7, 6],
          [6, 7, 7, 7, 7, 6, 7, 7, 7, 12, 13, 7, 7, 4, 7, 7, 6],
          [6, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6],
          [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]]
};

// declaring all variables to be used later
let xPos = 0;
let yPos = 0;
let hole = 1;
let shots = 0;
let gBall;
let dropped = false;
let shot = false;
let x = 0;
let y = -24;
let arrow;
let xSpeed = 0;
let ySpeed = 0;
let shotMade = false;
let ballSize = 15;
let xNegative = false;
let yNegative = false;
let startHole = false;
let back1, back2, back3;
let putt, clap, splash, wood;
let h1, h2, h3;
let score;
// end golf variables

let music;

let bg = 255;
let bodyColor;

function preload() {
  // intro images
  golfIcon = loadImage('images/golfIcon.png');
  balloonIcon = loadImage('images/balloonIcon.png');
  balloonIcon2 = loadImage('images/balloonIcon2.png');
  balloonIcon3 = loadImage('images/balloonIcon3.png');
  thePlayer = new Player();

  // for balloons game
  for (var i = 1; i < 9; i++) {
    balloonImgs.push(loadImage('images/balloon' + i + '.png'));
  }
  for (var i = 1; i < 3; i++) {
    cloudImgs.push(loadImage('images/cloud' + i + '.png'));
  }
  ground = loadImage("images/ground.png");
  sky = loadImage("images/sky.png");
  rock = loadImage("images/rock.png");

  soundFormats('ogg', 'mp3');
  popSound = loadSound('sound/popSound.mp3');
  // end balloons media

  // golf images and sounds
  // alternate file format
  soundFormats('ogg', 'mp3');
  // load all the tile images
  for (var i = 1; i < 18; i++) {
    tiles.push(loadImage('images/tile' + i + '.png'));
  }
  // load the golf ball image
  gBall = loadImage('images/golfBall.png');
  // load the sounds
  putt = loadSound('sound/putt.mp3');
  clap = loadSound('sound/clap.mp3');
  splash = loadSound('sound/splash.mp3');
  wood = loadSound('sound/wood.mp3');
  music = loadSound('sound/music.mp3');


}
function setup() {
  music.loop();
  intro = true;
  // createCanvas(800, 500);
  let canvas = createCanvas(800,500);
  canvas.parent('#game');

  displayIntro();
  recording.onResult = parseResult; // recognition callback for speech recognition
  recording.start(); // start speech recognition

  // create clouds for background of balloon game
  for (var i = 0; i < 11; i++) {
    clouds.push(new Cloud(cloudImgs[Math.floor(random(0, cloudImgs.length))], random(10,width-10), random(10, height/2 + 10)));
  }

  // balloon set up for easy mode
  for (var i = 0; i < 3; i++) {
    balloonsE.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX, balloonY));
    balloonsE.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 36, balloonY));
    balloonsE.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 72, balloonY));
   balloonY+= 45;
  }

  // balloon set up for medium mode
 balloonY= 140;
  for (var i = 0; i < 5; i++) {
    balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX - 36, balloonY));
    balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX, balloonY));
    balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 36, balloonY));
    balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 72, balloonY));
    balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 108, balloonY));
   balloonY+= 45;
  }

  // balloon set up for hard mode
 balloonY= 100;
  for (var i = 0; i < 7; i++) {
    balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX - 72, balloonY));
    balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX - 36, balloonY));
    balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX, balloonY));
    balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 36, balloonY));
    balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 72, balloonY));
    balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 108,balloonY));
    balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 144, balloonY));
   balloonY+= 45;
  }

  // rock to pop balloons
  r1 = new Rock(rock, 80, 375);


  // create all the holes for golf
  back1 = new Board(10, -24, 10, -24, 72, 250, 50, 230, 120, 30);
  back2 = new Board(10, -40, 10, -40, 650, 118, 627, 98, 120, 30);
  back3 = new Board(10, -40, 10, -40, 675, 118, 650, 98, 120, 30);
}

function draw() {

  // update body background color
  bodyColor = document.querySelector('body');
  bodyColor.style['background-color'] = 'rgb(' + bg + ',' + bg + ',' + bg +')';
  bg--;

  if (intro) {
    displayIntro();
    thePlayer.displayAndMove();
  }

  if (balloonsStart) {
    if (showBalloonsDifficulty) {
      showDifficulty();
    }
    else {
      imageMode(CORNER);
      image(sky, 0, 0);
      image(ground, 0, 225);
      // display clouds
      for (var i = 0; i < clouds.length; i++) {
        clouds[i].display();
      }

      // display rocks remaining and balloons popped
      fill(255, 0, 0);
      textSize(18);
      noStroke();
      textAlign(CENTER, CENTER);
      text('Rocks remaining: ' + rocksRemaining, 100, 30);
      text('Balloons popped: ' + popped, 100, 60);
      // display rock with arrow
      r1.display();



      // show approrpriate setting depending on what user chooses
      if (balloonsDifficulty === 'easy') {
        for (var i = 0; i < balloonsE.length; i++) {
          balloonsE[i].display();
          balloonsE[i].detectCollision(r1, 'easy');
        }
      }
      else if (balloonsDifficulty === 'medium') {
        for (var i = 0; i < balloonsM.length; i++) {
          balloonsM[i].display();
          balloonsM[i].detectCollision(r1, 'medium');
        }
      }
      else if (balloonsDifficulty === 'hard'){
        for (var i = 0; i < balloonsH.length; i++) {
          balloonsH[i].display();
          balloonsH[i].detectCollision(r1, 'hard');
        }
      }
    }

    // display new message
    if (balloonsGameOver) {
      balloonsGameOverScreen();
    }

  }

  if (golfStart) {
    // default background color and center images
    background(48, 214, 38);
    imageMode(CENTER);
    // create all the checks that have to be done for each hole
    h1 = new Hole(hole, 328, 475.5, 393, 440, 403, 76);
    h2 = new Hole(hole, 82.5, 180.5, 377, 426, 698.5, 355);
    h3 = new Hole(hole, 474.5, 525.5, 83, 180, 648.5, 403);
    fill(255);
    // give the player information about their score and the hole for each hole
    if (!startHole && hole === 1) {
      textSize(32);
      textAlign(CENTER);
      text("Hole 1 - Par 2", 400, 210);
      text("Currently you have taken " + shots + " shots.", 400, 250);
      text("Click to start the first hole.", 400, 290);
      textAlign(LEFT);
      textSize(12);
    }
    else if (!startHole && hole === 2) {
      textSize(32);
      textAlign(CENTER);
      text("Hole 2 - Par 3", 400, 210);
      if (shots === 1) {
        text("Currently you have taken " + shots + " shot.", 400, 250);
      }
      else {
        text("Currently you have taken " + shots + " shots.", 400, 250);
      }
      text("Click to start the next hole.", 400, 290);
      textAlign(LEFT);
      textSize(12);
    }
    else if (!startHole && hole === 3) {
      textSize(32);
      textAlign(CENTER);
      text("Hole 3 - Par 4", 400, 210);
      text("Currently you have taken " + shots + " shots.", 400, 250);
      text("Click to start the final hole.", 400, 290);
      textAlign(LEFT);
      textSize(12);
    }
    // if the player clicks to begin the next hole
    if (startHole) {
      // call action() based on the hole the player is on
      if (hole === 1) {
        h1.action();
      }
      else if (hole === 2) {
        h2.action();
      }
      else if (hole === 3) {
        h3.action();
      }
      // end page that asks the player if they want to play again
      else {
        // calculate the player's final score
        score = 9 - shots;
        textSize(32);
        textAlign(CENTER);
        // tell the player how many shots it took them to finish and how to play again
        text("Game Over! You finished in " + shots + " shots.", 400, 210);
        if (score === 0) {
          text("You scored par.", 400, 250);
        }
        else if (score === 1) {
          text("You scored " + score + " shot under par.", 400, 250);
        }
        else if (score === -1) {
          text("You scored " + score * -1 + " shot over par.", 400, 250);
        }
        else if (score > 1) {
          text("You scored " + score + " shots under par.", 400, 250);
        }
        else if (score < -1) {
          text("You scored " + score * -1 + " shots over par.", 400, 250);
        }
        text("Click to play again", 400, 290);
        text("or press 'b' to play balloons.", 400, 330);
        textAlign(LEFT);
        textSize(12);
      }
    }
  }

}
// parse speech
function parseResult() {
  if (!doneListening) {
    // get last word said
    var lastWord = recording.resultString.split(' ').pop();
    if(lastWord.indexOf("golf")!==-1) {
      golfSelected = true;
      thePlayer.displayAndMove();
      doneListening = !doneListening;
    }
    else if (lastWord.indexOf("balloons")!==-1 || lastWord.indexOf("balloon")!==-1 || lastWord.indexOf("blue")!==-1) {
      thePlayer.displayAndMove();
      balloonsSelected = true;
      doneListening = !doneListening;
    }
  }
}

function displayIntro() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text('A&D Mini Games', width/2, 50);
  textSize(24);
  text('Say which game you want to play out loud', width/2, 100);

  fill(255);
  imageMode(CENTER);
  textSize(36);

  text('Balloons', width/2 - 280, height/2 + 165);
  image(balloonIcon, width/2 - 280, height/2 + 50);

  text('Golf', width/2 + 280, height/2 + 165);
  image(golfIcon, width/2 + 280, height/2 + 50);
}

function balloonsGameOverScreen(){
  rectMode(CENTER);
  fill(111,152,205);
  rect(width/2, height/2, width, height);
  showArrow = false;
  rockUp = false;
  rockDown = false;
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(84);
  text('GAME OVER', width/2, height/2 - 80);
  textSize(48);
  text('You popped ' + popped + ' balloons', width/2, height/2 + 10);
  textSize(36);
  text('Play again?', width/2, height/2 + 70);
  textSize(28);
  text("Press 'e' for easy, 'm' for medium, 'h' for hard", width/2, height/2 + 120);
  text("or press 'g' to play golf", width/2, height/2 + 160);

  // // if any balloons left, get rid of them to recreate array
  balloonsE = [];
  balloonsM = [];
  balloonsH = [];
}

function keyPressed() {
  if (showBalloonsDifficulty) {
    // select difficulty
    if (key === 'E') {
      showBalloonsDifficulty = false;
      balloonsDifficulty = 'easy';
    }
    else if (key === 'M') {
      showBalloonsDifficulty = false;
      balloonsDifficulty = 'medium';
    }
    else if (key === 'H') {
      showBalloonsDifficulty = false;
      balloonsDifficulty = 'hard';
    }
  }
  if (balloonsSelected && !balloonsGameOver) {
    // shoot rock
    if (key === ' ') {
      showBalloonsDifficulty = false;
      r1.shoot(r1.arrow.angle);
      up = false;
      down = false;
      showArrow = false;
    }
  }
  if (balloonsSelected && (balloonsGameOver || switchToGolf) && !showBalloonsDifficulty) {
    // select difficulty and reset game variables to start again
    if (key === 'E') {
      balloonsDifficulty = 'easy';
      rocksRemaining = 3;
      balloonsGameOver = false;
      popped = 0;

     balloonY= 150;
      for (var i = 0; i < 3; i++) {
        balloonsE.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX, balloonY));
        balloonsE.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 36, balloonY));
        balloonsE.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 72, balloonY));
       balloonY+= 45;
      }
      showArrow = true;
    }
    if (key === 'M') {
      balloonsDifficulty = 'medium';
      rocksRemaining = 3;
      balloonsGameOver = false;
      popped = 0;

     balloonY= 140;
      for (var i = 0; i < 5; i++) {
        balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX - 36, balloonY));
        balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX, balloonY));
        balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 36, balloonY));
        balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 72, balloonY));
        balloonsM.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 108, balloonY));
       balloonY+= 45;
      }
      showArrow = true;

    }
    if (key === 'H') {

      balloonsDifficulty = 'hard';
      balloonsGameOver = false;
      rocksRemaining = 3;
      popped = 0;

     balloonY= 100;
      for (var i = 0; i < 7; i++) {
        balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX - 73, balloonY));
        balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX - 36, balloonY));
        balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX, balloonY));
        balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 36, balloonY));
        balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 72, balloonY));
        balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 108, balloonY));
        balloonsH.push(new Balloon(balloonImgs[Math.floor(random(0,balloonImgs.length))], balloonX + 144, balloonY));
       balloonY+= 45;
      }
      showArrow = true;
    }
    if (key === 'G') {
      balloonsSelected = false;
      golfStart = true;
      shots = 0;
      startHole = false;

      // reset balloons game variables
      popped = 0;
      rocksRemaining = 3;
    }
  }
  if (golfStart) {
    if (key === 'B') {
      balloonsSelected = true;
      balloonsStart = true;
      balloonsGameOver = false;
      switchToGolf = true;
      showBalloonsDifficulty = true;
      golfStart = false;
      hole = 1;
    }
  }
}


// player for intro
function Player() {
  // player to be close to middle
  this.x = 400;
  this.y = 300;

  // arrays that will contain every frame
  this.leftCycle = [];
  this.rightCycle = [];

  // image counter and current cycle array
  this.currentImage = 0;
  this.currentCycle = this.rightCycle;

  // load images
  for (var i = 0; i < 45; i++) {
    var fileName = "frame" + i + ".png";
    this.leftCycle.push(loadImage("images/player/left/" + fileName));
    this.rightCycle.push(loadImage("images/player/right3/" + fileName));
  }

  // display and move function
  this.displayAndMove = function() {
    // handle movement
    if (balloonsSelected) {
      this.x -= 1;
      this.currentCycle = this.leftCycle;
    }
    if (golfSelected) {
      this.x += 1;
      this.currentCycle = this.rightCycle;
    }
    this.currentCycle;

    // draw the appropriate cycle image
    image(this.currentCycle[ this.currentImage ], this.x, this.y);
    if (this.x > 691) {
      // this.x = 691;
      golfStart = true;
      intro = false;
    }
    if (this.x < 128) {
      // this.x = 128;
      balloonsStart = true;
      showBalloonsDifficulty = true;
      intro = false;
    }
    // increase current image to go to the next gif image
    if ((golfSelected || balloonsSelected ) && frameCount % 10 == 0) {
      this.currentImage += 1;
    }

    // go back to first image
    if (this.currentImage >= 45) {
      this.currentImage = 0;
    }
  }
}

function showDifficulty() {
  rectMode(CENTER);
  textAlign(CENTER);
  noStroke();

  fill(0,0,255);
  rect(136, height/2, 274, height);
  fill(0,255,0);
  rect(409, height/2, 274, height);
  fill(255,0,0);
  rect(683, height/2, 274, height);

  fill(255);
  textSize(50);
  text('EASY', 136, 100);
  text('HARD', 683, 100);
  fill(0);
  text('MEDIUM', 409, 400);

  image(balloonIcon, 136, 250);
  image(balloonIcon2, 409, 250);
  image(balloonIcon3, 683, 250);

  textSize(16);
  text("Press 'e'", 136, 310);
  text("Press 'h'", 683, 310);
  fill(255);
  text("Press 'm'", 409, 310);

}

// cloud for balloons game background
class Cloud {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = random(15,50);
    // cloud floats at random speed
    this.speed = random(0,1) * .1;
  }

  display() {
    this.x -= this.speed;
    // wrap around
    if (this.x + 80 < 0) {
      // change position and speed
      this.x = width + 12;
      this.y = random(10, height/2 + 10);
      this.speed = random(0,1) * .05;
    }
    // display image
    image(this.img, this.x, this.y);
  }
}

// target of rocks
class Balloon {
  constructor(image, x, y) {
    this.img = image;
    this.xPos = x;
    this.yPos = y;
  }

  display() {
    fill(255);
    imageMode(CENTER);
    image(this.img, this.xPos, this.yPos);
  }

  detectCollision(rock, mode) {
    // remove balloon from appropriate balloons array if rock hits it
    if (dist(rock.x, rock.y, this.xPos, this.yPos) < 22) {
      if (mode === 'easy') {
        balloonsE.splice(balloonsE.indexOf(this),1);
      }
      else if (mode === 'medium') {
        balloonsM.splice(balloonsM.indexOf(this),1);
      }
      else if (mode === 'hard'){
        balloonsH.splice(balloonsH.indexOf(this),1);
      }

      // increase popped balloon count and play sound
      popSound.play();
      popped++;
    }
  }
}

// used to hit balloons
class Rock {

  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 0;

    // for directing aim
    this.arrow = new Arrow(this.x, this.y,0,0);
  }

  display() {
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    this.arrow.display(this.x, this.y, 0, 0);
    this.x += this.xSpeed;
    this.y -= this.ySpeed;

    // adjust y speed depending on the angle and if the rock is already going up
    if (rockUp) {
      if (angle1) {
        this.ySpeed *= 0.95;
      }
      else if (angle2) {
        this.ySpeed *= 0.97;
      }
      else if (angle3) {
        this.ySpeed *= 0.98;
      }
      else if (angle4) {
        this.ySpeed *= 0.95;
      }
      else if (angle5) {
        this.ySpeed *= 0.97;
      }
    }
    else if (rockDown) {
      if (angle1) {
        if (this.ySpeed > -15) {
          this.ySpeed *= 1.1;
        }
        else {
          this.ySpeed *= 1.000000008;
        }
      }
      else if (angle2) {
        if (this.ySpeed > -15) {
          this.ySpeed *= 1.1;
        }
        else {
          this.xSpeed *= 1.005;
          this.ySpeed *= 1.000000008;
        }
      }
      else if (angle3) {
        if (this.ySpeed > -15) {
          this.ySpeed *= 1.1;
          this.xSpeed *= 1.0085;
        }
        else {
          this.ySpeed *= 1.000000008;
        }
      }
      else if (angle4) {
        if (this.ySpeed > -15) {
          this.ySpeed *= 1.1;
        }
        else {
          this.ySpeed *= 1.000000008;
        }
      }
      else if (angle5) {
        if (this.ySpeed > -15) {
          this.ySpeed *= 1.2;
        }
        else {
          this.ySpeed *= 1.000000008;
        }
      }

      if (this.y >= 445) {
        // reset rock and arrow once it hits the ground
        this.y = 445;
        this.xSpeed = 0;
        this.ySpeed = 0;

        if (frameCount % 300 === 0) {
          if (!balloonsGameOver) {
            showArrow = true;
            this.x = 80;
            this.y = 375;
            up = true;
          }
        }
        if (rocksRemaining <= 0) {
          if (frameCount % 300 === 0) {
            balloonsGameOver = true;
            balloonsGameOverScreen();
          }
        }
      }
    }

    // adjust speed and direction of rock based on angle and previous speed
    if (angle1) {
      if (this.ySpeed < .5 && this.y < 85) {
        this.ySpeed = -.30;
        rockUp = false;
        rockDown = true;
      }
    }
    else if (angle2) {
      if (this.ySpeed < 3 && this.y < 145) {
        this.ySpeed = -.80;
        rockUp = false;
        rockDown = true;
      }
    }
    else if (angle3) {
      if (this.ySpeed < 8 && this.y < 270) {
        this.ySpeed = -.80;
        rockUp = false;
        rockDown = true;
      }
    }
    else if (angle4) {
      if (this.ySpeed < .5 && this.y < 337) {
        this.ySpeed = -.80;
        rockUp = false;
        rockDown = true;
      }
    }
    else if (angle5) {
      if (this.ySpeed < .5 && this.y < 367) {
        this.ySpeed = -.80;
        rockUp = false;
        rockDown = true;
      }
    }
  }

  shoot(angle) {
    rockUp = true;
    // set angle based on rotation angle
    if (angle >= -160 && angle <= -136) {
      angle1 = true;
      angle2 = false;
      angle3 = false;
      angle4 = false;
      angle5 = false;
      this.xSpeed = 2.8;
      this.ySpeed = 15;
    }
    else if (angle > -136 && angle <= -122) {
      angle1 = false;
      angle2 = true;
      angle3 = false;
      angle4 = false;
      angle5 = false;
      this.xSpeed = 5.7;
      this.ySpeed = 8.5;
    }
    else if (angle > -122 && angle <= -108) {
      angle1 = false;
      angle2 = false;
      angle3 = true;
      angle4 = false;
      angle5 = false;
      this.xSpeed += 5;
      this.ySpeed += 3;
    }
    else if (angle > -108 && angle <= -94) {
      angle1 = false;
      angle2 = false;
      angle3 = false;
      angle4 = true;
      angle5 = false;
      this.xSpeed += 7;
      this.ySpeed += 2.1;
    }
    else if (angle > -94 && angle <= -80) {
      angle1 = false;
      angle2 = false;
      angle3 = false;
      angle4 = false;
      angle5 = true;
      this.xSpeed += 10;
      this.ySpeed += .8;
    }

    // decrease rocks left to throw
    rocksRemaining--;
  }
}

// aim guide for rock
class Arrow {

  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.angle = -80;
    this.speed = 1.1;
  }

  display(x1, y1, x2, y2) {
    strokeWeight(10);
    stroke(255);

    if (showArrow) {
      push();
      // draw a line between two points relative to the rock and rotate it
      translate(this.x1, this.y1);
      rotate(radians(this.angle));
      beginShape();
      vertex(this.x1 - 48, this.y1 - 200);
      vertex(this.x1 - 75, this.y1 - 350);
      endShape(CLOSE);
      pop();

      // move arrow in direction based on previous directoin
      if (up) {
        moveArrowUp(this);
      }
      else if (down) {
        moveArrowDown(this);
      }
    }
    else {
      // hide arrow
      strokeWeight(0);
      fill(0,0,0,0)
    }
  }
}

function moveArrowUp(arrow) {
  // rotate left
  arrow.angle -= arrow.speed;
  if (arrow.angle < -160) {
    arrow.angle = -160;
    up = false;
    down = true;
  }
}

function moveArrowDown(arrow) {
  // rotate right
  arrow.angle += arrow.speed;
  if (arrow.angle > -80) {
    arrow.angle = -80;
    up = true;
    down = false;
  }
}

// golf hole
class Hole {
  constructor(holeNum, xMin, xMax, yMin, yMax, holeX, holeY) {
    // hole number
    this.holeNum = holeNum;
    // starting box boundaries
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    // position of the center of the hole
    this.holeX = holeX;
    this.holeY = holeY;
  }

  action() {
    // display the hole the player is on
    if (this.holeNum === 1) {
      back1.display(map.hole1);
    }
    else if (this.holeNum === 2) {
      back2.display(map.hole2);
    }
    else if (this.holeNum === 3) {
      back3.display(map.hole3);
    }
    // show the ball and no cursor when the ball is over the starting position
    if (!dropped && mouseX >= this.xMin && mouseX <= this.xMax && mouseY >= this.yMin && mouseY <= this.yMax) {
      noCursor();
      image(gBall, mouseX, mouseY);
    }
    // otherwise if the ball hasn't been dropped yet just show the cursor
    else if (!dropped) {
      cursor();
    }
    // else how the cursor and the ball
    else {
      // 425.5 184
      cursor();
      // the ball needs to be close to the hole and not going to fast to count as a shot made
      if (dist (this.holeX, this.holeY, x, y) > 10 || (xSpeed > 3 || xSpeed < -3) || (ySpeed > 3 || ySpeed < -3)) {
        // draw the ball
        image(gBall, x, y);
        // display the arrow coming out of the ball
        arrow = new GolfArrow(x, y, mouseX, mouseY, dist(x + 7, y, mouseX, mouseY));
        if (!shot) {
          arrow.display();
        }
        // ball is shot
        if (shot) {
          // check all the obstacles for hole 1
          if (this.holeNum === 1) {
            if (x <= 287) {
              x = 288;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x >= 515) {
              x = 514;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (y <= 33) {
              y = 34;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            if (y >= 484) {
              y = 483;
              ySpeed *= -1;
              yNegative = false;
              wood.play();
            }
            if (x >= 324 && x <= 479 && y <= 229 && y >= 190) {
              if (y >= 190 && y <= 195) {
                ySpeed *= -1;
                y = 189;
                yNegative = false;
                wood.play();
              }
              else {
                ySpeed *= -1;
                y = 230;
                yNegative = true;
                wood.play();
              }
            }
            if (x >= 321 && x < 324 && y <= 229 && y >= 190) {
              xSpeed *= -1;
              x = 320;
              xNegative = true;
              wood.play();
            }
            if (x > 479 && x <= 482 && y <= 229 && y >= 190) {
              xSpeed *= -1;
              x = 483;
              xNegative = false;
              wood.play();
            }
          }
          // check all the obstacles for hole 2
          if (this.holeNum === 2) {
            if (x <= 42.5) {
              x = 43;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x >= 221.5 && x <= 235 && y >= 188) {
              x = 221;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (y <= 88) {
              y = 89;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            if (y >= 468) {
              y = 467;
              ySpeed *= -1;
              yNegative = false;
              wood.play();
            }
            if (x >= 221.5 && x <= 286 && y >= 174) {
              y = 173;
              ySpeed *= -1;
              yNegative = false;
              wood.play();
            }
            else if (x > 286 && x <= 289 && y >= 174) {
              x = 290;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x >= 517 && x < 527 && y <= 285) {
              x = 516;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (x >= 763 && y > 285) {
              x = 762;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (x >= 527 && x < 763 && y > 203 && y <= 287) {
              y = 286;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            // check if the ball goes in the water
            // start the ball at the beginning if this happens
            if (dist(x, y, 425.5, 184) < 35 || dist(x, y, 375.5, 380) < 35) {
              x = 130;
              y = 400;
              xSpeed = 0;
              ySpeed = 0;
              // play a splash sound when the play hits the water
              splash.play();
            }
          }
          // check all the obstacles for hole 3
          if (this.holeNum === 3) {
            if (y <= 41) {
              y = 42;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            if (x >= 564 && y <= 222) {
              x = 563;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (y >= 468) {
              y = 467;
              ySpeed *= -1;
              yNegative = false;
              wood.play();
            }
            if (x <= 42) {
              x = 43;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x >= 419 && x <= 566 && y > 222 && y < 240) {
              y = 222;
              ySpeed *= -1;
              yNegative = false;
              wood.play();
            }
            if (x >= 419 && x <= 713 && y <= 285 && y >= 265) {
              y = 286;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            if (x >= 221 && x <= 287 && y >= 321 && y <= 331) {
              y = 320;
              ySpeed *= -1;
              yNegative = false;
              wood.play();
            }
            if (x >= 221 && x <= 231 && y > 331 && y < 468) {
              x = 220;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (x <= 287 && x >= 277 && y > 331 && y < 468) {
              x = 288;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x >= 42 && x <= 189 && y <= 237 && y >= 227) {
              y = 238;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            if (x <= 189  && x > 179 && y > 42 && y < 89) {
              x = 190;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x <= 189 && y >= 183 && y < 234) {
              x = 190;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x <= 140 && y >= 89 && y <= 179) {
              x = 141;
              xSpeed *= -1;
              xNegative = false;
              wood.play();
            }
            if (x > 140 && x <= 179 && y < 89 && y > 79) {
              y = 90;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            if (x > 140 && x <= 179 && y > 173 && y < 183) {
              y = 172;
              ySpeed *= -1;
              yNegative = false;
              wood.play();
            }
            if (x >= 417 && x < 424 && y >= 237 && y <= 284) {
              x = 416;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (x >= 714 && x < 724 && y >= 273 && y <= 333) {
              x = 713;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (x >= 761 && x < 781 && y >= 333 && y <= 468) {
              x = 760;
              xSpeed *= -1;
              xNegative = true;
              wood.play();
            }
            if (x >= 714 && x < 761 && y > 333 && y <= 343) {
              y = 344;
              ySpeed *= -1;
              yNegative = true;
              wood.play();
            }
            // check if the ball goes in the water
            // start the ball at the beginning if this happens
            if (dist(x, y, 277.5, 132) < 35 || dist(x, y, 130.5, 329) < 35 || dist(x, y, 475.5, 380) < 35) {
              x = 500;
              y = 130;
              xSpeed = 0;
              ySpeed = 0;
              // play a splash sound when the play hits the water
              splash.play();
            }
          }

          // move it in it's x and y direction
          x += xSpeed;
          y -= ySpeed;
          if (xNegative) {
            // stop the ball when it reaches a certain speed
            if (xSpeed >= -.1) {
              xSpeed = 0;
            }
            else {
              // decrease the speed by 2% a frame
              xSpeed -= xSpeed * .02;
            }
          }
          else {
            // stop the ball when it reaches a certain speed
            if (xSpeed <= .1) {
              xSpeed = 0;
            }
            else {
              // decrease the speed by 2% a frame
              xSpeed -= xSpeed * .02;
            }
          }
          if (yNegative) {
            // stop the ball when it reaches a certain speed
            if (ySpeed >= -.1) {
              ySpeed = 0;
            }
            else {
              // decrease the speed by 2% a frame
              ySpeed -= ySpeed * .02;
            }
          }
          else {
            // stop the ball when it reaches a certain speed
            if (ySpeed <= .1) {
              ySpeed = 0;
            }
            else {
              // decrease the speed by 2% a frame
              ySpeed -= ySpeed * .02;
            }
          }
          // make the shot false when the x and y speeds are 0
          if (xSpeed === 0 && ySpeed === 0) {
            shot = false;
          }
        }
      }
      // the shot is close enough to the hole and going slow enough so the shot is good
      else if (!shotMade) {
        shotMade = true;
        image(gBall, x, y);
      }
      // decrease the size of the ball to make the illusion that it's going in the hole
      else if (shotMade && gBall.width > 0){
        image(gBall, x, y);
        gBall.width--;
      }
      else {
        // play the applause sound
        clap.play();
        // go to the next hole and reset the following properties
        hole = this.holeNum + 1;
        gBall.width = 15;
        shotMade = false;
        dropped = false;
        xSpeed = 0;
        ySpeed = 0;
        if (hole < 4) {
          startHole = false;
        }
      }
    }
  }
}

// golf board
class Board {
  constructor(xPos, yPos, defaultX, defaultY, scoreXPos, scoreYPos, scoreXOutline, scoreYOutline, scoreWidth, scoreHeight) {
    // positions of the tiles and scoreboard
    this.xPos = xPos;
    this.yPos = yPos;
    this.defX = defaultX;
    this.defY = defaultY;
    this.scoreXPos = scoreXPos;
    this.scoreYPos = scoreYPos;
    this.scoreXOutline = scoreXOutline;
    this.scoreYOutline = scoreYOutline;
    this.scoreWidth = scoreWidth;
    this.scoreHeight = scoreHeight;
  }

  display(hole) {
    // fill the screen with the proper tiles
    for (let i = 0; i < hole.length; i++) {
      this.xPos = this.defX;
      this.yPos += 49;
      for (let j = 0; j < hole[i].length; j++) {
        image(tiles[hole[i][j]], this.xPos, this.yPos);
        this.xPos += 49;
      }
    }
    this.xPos = this.defX;
    this.yPos = this.defY;
    // draw the scoreboard with the updated number of shots taken
    noFill();
    strokeWeight(3);
    // rect(this.scoreXOutline, this.scoreYOutline, this.scoreWidth, this.scoreHeight);
    fill(255);
    noStroke();
    textSize(12);
    textAlign(CENTER);
    text("Total Shots: " + shots, this.scoreXPos + 30, this.scoreYPos);
  }
}

// arrow for guiding golf ball
class GolfArrow {
  constructor(x1, y1, x2, y2, d) {
    // position of the middle of the ball and the end of the arrow
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    // length of the arrow
    this.d = d;
  }

  display() {
    strokeWeight(3);
    stroke(0);
    // draw the arrow from the center of the ball to the mouse
    line(this.x1, this.y1, mouseX, mouseY);
    this.d = dist(this.x1, this.y1, mouseX, mouseY);
    // the speed of the shot is based on the distance of the arrow
    this.xSpeed = (mouseX - this.x1) / 40;
    this.ySpeed = (this.y1 - mouseY) / 40;
  }
}

// detects when golf ball is ready to be hit
function mouseReleased() {
  // the player clicked to start playing the hole
  if (!startHole) {
    startHole = true;
  }
  // start the game again if the mouse is pressed
  if (hole === 4) {
    hole = 1;
    shots = 0;
    startHole = false;
  }
  // if the ball is in the starting range drop the ball at the mouse position
  if (!dropped && mouseX >= 328 && mouseX <= 475.5 && mouseY >= 393 && mouseY <= 440 && hole === 1) {
    dropped = true;
    x = mouseX;
    y = mouseY;
  }
  // if the ball is in the starting range drop the ball at the mouse position
  else if (!dropped && mouseX >= 82.5 && mouseX <= 180.5 && mouseY >= 377 && mouseY <= 426 && hole === 2) {
    dropped = true;
    x = mouseX;
    y = mouseY;
  }
  // if the ball is in the starting range drop the ball at the mouse position
  else if (!dropped && mouseX >= 474.5 && mouseX <= 525.5 && mouseY >= 83 && mouseY <= 180 && hole === 3) {
    dropped = true;
    x = mouseX;
    y = mouseY;
  }
  else if (dropped && !shot) {
    // a shot was taken so increment the shot counter and play the putt sound
    shots++;
    putt.play();
    // figure out if the x and y speeds are negative and set these values to true or false based on this
    xSpeed = arrow.xSpeed;
    ySpeed = arrow.ySpeed;
    if (xSpeed < 0) {
      xNegative = true;
    }
    else {
      xNegative = false;
    }
    if (ySpeed < 0) {
      yNegative = true;
    }
    else {
      yNegative = false;
    }
    // a shot is in progress
    shot = true;
  }
}
