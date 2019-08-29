var paddleXPos = 350;

var ballXPos = 400;
var ballYPos = 400;

var ballXSpeed = 0;
var ballYSpeed = 0;

var maxSpeed = 12;

var coin;
var coinX, coinY;

var score = 0;
var misses = 0;

// random number
var r;

var rVal, gVal, bVal;

var start = false;

var coinArr = ['cow.png', 'elephant.png', 'monkey.png', 'penguin.png', 'pig.png', 'zebra.png'];
var l = coinArr.length;
var bg;

var boing,yikes,coinSound;

function preload() {
  // load all images
  bg = loadImage('img/bg.jpg');
  for (var i = 0; i < coinArr.length; i++) {
    loadImage('img/' + coinArr[i]);
  }
  coin = loadImage('img/' + coinArr[Math.floor(random(l))]);

  // load sound
  soundFormats('ogg', 'mp3');
  boing = loadSound('sound/boing.mp3');
  yikes = loadSound('sound/yikes.mp3');
  coinSound = loadSound('sound/coinSound.mp3');
}

function setup() {
  createCanvas(800,800);
  image(bg,0,0);

  // 3 borders
  rVal = 50;
  gVal = 255;
  bVal = 0;
  fill(rVal,gVal,bVal);
  noStroke();
  rect(0,0,10,800);
  rect(0,0,800,10);
  rect(790,10,10,800);

  // paddle
  fill(255);
  rect(paddleXPos,790,100,10,6);

  // ball
  fill(255);
  ellipse(ballXPos,ballYPos,25,25);

  // set speed
  r = random(100);
  ballXSpeed = random(3,6);
  ballYSpeed = random(3,6);
  if (r <= 25) {
    ballXSpeed *= -1;
  }
  else if (r <= 50) {
    ballYSpeed *= -1;
  }
  else if (r <= 75) {
    ballXSpeed *= -1;
    ballYSpeed *= -1;
  }

  // make sure coin is within bounds
  coinX = random(64/2 + 10, width - 64/2 - 10);
  coinY = random(64/2 + 10, height - 200);

  imageMode(CENTER);
  image(coin, coinX, coinY);
}

function draw() {
  image(bg,400,400);
  fill(rVal,gVal,bVal);
  rect(0,0,10,800);
  rect(0,0,800,10);
  rect(790,10,10,800);

  // display score
  fill(255);
  text("Score: " + score, 30, 40);
  text("Misses: " + misses, 30, 60);

  // coin
  fill(140,40,200);

  image(coin, coinX, coinY);

  //ball
  fill(255);
  ellipse(ballXPos,ballYPos,25,25);

  // once user clicks, ball changes position
  if (start) {
    ballXPos+= ballXSpeed;
    ballYPos+= ballYSpeed;
  }

  // check for ball collisions
  // left and right walls
  if (ballXPos < 25 || ballXPos > width - 25) {
    // speed up X and change direction
    ballXSpeed *= -1.08;

    boing.play();

    rVal = random(255);
    gVal = random(255);
    bVal = random(255);
  }
  // top wall
  if (ballYPos < 25) {
    // speed up y and change directions
    ballYSpeed *= -1.08;

    boing.play();

    rVal = random(255);
    gVal = random(255);
    bVal = random(255);
  }

  // paddle collision
  if ((ballXPos >= paddleXPos) && (ballXPos <= paddleXPos + 100) && (ballYPos + 12.5 >= height - 10)) {
    // fix ball height so it goes above paddle if ball gets stuck on paddle
    if (ballYPos + 12.5 > height - 10) {
      ballYPos = height - 22.5;
    }
    // if ball hits left side of paddle, make ball go left
    if (ballXPos <= paddleXPos + 50) {
      // if ball is going right, go left
      if (ballXSpeed > 0) {
        ballXSpeed *= -1;
      } // else continue going right
    }
    else { //if ball hits right side of paddle, make ball go right
      // if ball is going left, make it go right
      if (ballXSpeed < 0) {
        ballXSpeed *= -1;
      } // else continue going left
    }
    // reverse y direction and increase speed slightly
    ballYSpeed *= -1.08;
    boing.play();
  }

  // check max speed
  if (ballXSpeed >= maxSpeed) {
    ballXSpeed = maxSpeed;
  }
  if (ballYSpeed >= maxSpeed) {
    ballYSpeed = maxSpeed;
  }
  // check min speed
  if (ballXSpeed <= -1 * maxSpeed) {
    ballXSpeed = -1 * maxSpeed;
  }
  if (ballYSpeed <= -1 * maxSpeed) {
    ballYSpeed = -1 * maxSpeed;
  }

  // coin collision
  if (dist(ballXPos, ballYPos, coinX, coinY) < 12.5 + 64/2) {
    // move coin position
    coin = loadImage('img/' + coinArr[Math.floor(random(l))]);
    coinX = random(64/2 + 10, width - 64/2 - 10);
    coinY = random(64/2 + 10, height - 200);

    // update score
    score++;
    coinSound.play();
  }

  // bottom
  // reset ball position once entire ball is off the screen
  if (ballYPos > width + 12.5) {
    // update misses
    misses++;
    // reset ball position
    ballXPos = 400;
    ballYPos = 400;

    // choose random direction for ball to move in
    r = random(100);
    ballXSpeed = random(3,5);
    ballYSpeed = random(3,5);
    if (r <= 25) {
      ballXSpeed *= -1;
    }
    else if (r <= 50) {
      ballYSpeed *= -1;
    }
    else if (r <= 75) {
      ballXSpeed *= -1;
      ballYSpeed *= -1;
    }
    start=false;
    yikes.play();
  }

  //update paddle's position based on user's keys pressed
  // left
  if (keyIsDown(65)) {
    // stop paddle at wall
    paddleXPos-=5;
    if (paddleXPos <= 10) {
      paddleXPos = 10;
    }
  }
  // right
  else if (keyIsDown(68)) {
    // stop paddle at wall
      paddleXPos += 5;
      if (paddleXPos >= 690) {
        paddleXPos = 690;
      }
  }

  // redraw paddle
  fill(255);
  rect(paddleXPos,790,100,10,6);
}

// move ball on mouse press
function mousePressed() {
  start = true;
}
