// player images
let player, playerUp, playerDown, playerLeft, playerRight;
// enemies
let enemies = [];
let enemiesToDisplay = 0;
let enemySpeeds = [];
// background animiation variables
let stars = [];
let bgimg;
let bg = 255;
let bodyColor;
// range slider
let controls;
// coin objective
let cookie;
let c;
// sounds
let spaceSound, crunchSound;

// booleans or states of game
let easy = false;
let medium = false;
let hard = false;
let intro = true;
let play = false;
let end = false;

let score = 0;

function preload() {
  // load images
  playerUp = loadImage('img/playerUp.png');
  playerDown = loadImage('img/playerDown.png');
  playerRight = loadImage('img/playerRight.png');
  playerLeft = loadImage('img/playerLeft.png');
  enemy = loadImage('img/enemy.png');
  bgimg = loadImage('img/bg.jpg');
  cookie = loadImage('img/cookie.png');

  // load sound
  soundFormats('ogg', 'mp3');
  spaceSound = loadSound('sound/space.mp3')
  crunchSound = loadSound('sound/crunchSound.mp3');
}

function setup() {
  // parent the canvas
  let canvas = createCanvas(800,500);
  canvas.parent('#game');

  background(0);
  // create player object
  player = new Player();

  // create enemies
  for (let i = 0; i < 10; i++) {
    enemySpeeds.push(random(1,4));
    enemies.push(new Enemy(random(width, width+600),random(0,height),100, 25,enemySpeeds[i]));
  }

  // create stars for background
  for (let i = 0; i < 35; i++) {
    s = new Star(random(10,width-10), random(10, height - 10));
    stars.push(s);
  }

  // create target
  c = new Cookie(random(50,width-50), random(50,height-50));

  // play sound
  spaceSound.loop();
}

function draw() {

  // show instructions at the beginning
  if (intro){
    // show instructions at the beginning of the game
    background(bg);
    showText();

    // easy mode selected
    if (keyIsDown(69)) {
      easy = true;
      play = true;
    }
    // medium mode selected
    if (keyIsDown(77)) {
      medium = true;
      play = true;
    }
    // hard mode selected
    if (keyIsDown(72)) {
      hard = true;
      play = true;
    }
  }

  // update body background color
  bodyColor = document.querySelector('body');
  bodyColor.style['background-color'] = 'rgb(' + bg + ',' + bg + ',' + bg +')';

  // play game once difficulty is chosen
  if (play) {
    intro = false;
    // transition white screen to black
    bg -= 2;
    if (bg < 0) {
      bg = 0;
      // display range slider
      controls = document.getElementById('controls');
      controls.style.display = 'flex';
      // display background image
      image(bgimg, width/2, height/2, width, height)
    }
    else {
      // display white screen with instructions until bg is 0 (black)
      background(bg);
      showText();
    }

    if (easy) {
      // only display 3
      enemiesToDisplay = 3;
    }
    if (medium) {
      // display 5
      enemiesToDisplay = 5;
    }
    if (hard) {
      // display 8
      enemiesToDisplay = 10;
    }

    // display moving stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].display();
    }

    // display and update player
    player.display();

    // display and update enemies
    for (let i = 0; i < enemiesToDisplay; i++) {
      enemies[i].display();
      enemies[i].speed = enemySpeeds[i];
      enemies[i].checkCollision(player);
    }

    // display target and check for collisions
    c.display();
    c.checkCollision(player);

    // display score
    text("Score: " + score, 50, 30);
  }

  if (end) {
    background(0);
    fill(255,0,0);
    textAlign(CENTER, CENTER);
    textSize(80);
    text('GAME OVER', width/2, height/2);
    textSize(40);
    text('Score: ' + score, width/2, height/2 + 75);
    textSize(18);
    text("Press 'P' to play again", width/2, height/2 + 125);

    // play again (P)
    if (keyIsDown(80)) {
      play = true;
      end = false;
      score = 0;
      // move enenmies to the right and randomze speeds
      for (let i = 0; i < enemiesToDisplay; i++) {
        enemies[i].x = width + 500;
        enemySpeeds[i] = random(1, enemySpeeds[i]);
      }
    }
  }
}

// target
class Cookie {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = 40;
  }
  display() {
    imageMode(CENTER);
    image(cookie, this.x, this.y, this.w, this.w);
  }

  // check for collisions with player to update score and then reposition itself
  checkCollision(player) {
    if (!(this.x - this.w/2 > player.x + player.w/2 || this.x + this.w/2 < player.x - player.w/2 || this.y - this.w/2 > player.y + player.w/2 || this.y + this.w/2 < player.y - player.w/2)) {
      // play sound
      crunchSound.play();
      score+=3;
      this.x = random(50,width-50);
      this.y = random(50,height-50);
    }
  }
}

// user
class Player {

  constructor() {
    this.x = random(50,150);
    this.y = random(50, height - 50);
    this.minX = 50;
    this.maxX = width - 50;
    this.minY = 50;
    this.maxY = height - 50;
    this.w = 85;
    this.h = 50;
    this.img = playerRight;
  }

  display() {
    noStroke();
    fill(255,155,80);
    imageMode(CENTER);

    // adjust image, movement, and width/height depending on key pressed
    // W
    if (keyIsDown(87)) {
      this.y-=5;
      this.w  = 50;
      this.h = 85;
      image(playerUp, this.x, this.y, this.w, this.h);
    }
    // S
    else if (keyIsDown(83)) {
      this.y+=5;
      this.w = 50;
      this.h = 85;
      image(playerDown, this.x, this.y, this.w, this.h);
    }
    // A
    else if (keyIsDown(65)) {
      this.x-=5;
      this.w = 85;
      this.h = 50;
      image(playerLeft, this.x, this.y, this.w, this.h);

    }
    // D
    else if (keyIsDown(68)) {
      this.x+=5;
      this.w = 85;
      this.h = 50;
      image(playerRight, this.x, this.y, this.w, this.h);
    }
    else {
      // if no button is pressed, have character face right
      this.w = 85;
      this.h = 50;
      image(playerRight, this.x, this.y, this.w, this.h);
    }

    // limit x and y positions of character
    if (this.x >= this.maxX) {
      this.x = this.maxX;
    }
    if (this.x <= this.minX) {
      this.x = this.minX;
    }
    if (this.y >= this.maxY) {
      this.y = this.maxY;
    }
    if (this.y <= this.minY) {
      this.y = this.minY;
    }
  }
}

class Enemy {

  constructor(x,y,width,height,speed) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.speed = speed;
    this.noiseOffsetY = random(10000,30000);

  }

  display() {
    fill(255,0,0);

    // move asteroid left
    this.x -= this.speed;

    // use Perlin noise to move Y
    let noiseValueY = noise(this.noiseOffsetY);
    let moveAmountY = map (noiseValueY, 0, 1, -2, 2);
    this.y += moveAmountY;
    this.noiseOffsetY += .03;

    // wrap around and update score if asteroid goes off screen (meaning no collision with player)
    if (this.x < 0) {
      this.x = width + 150;
      this.y = random(50,height);
      score++;
    }
    // limit y
    if (this.y < 50 ) {
      this.y = 50;
    }
    if (this.y > height - 50) {
      this.y = height - 50;
    }

    imageMode(CENTER);
    image(enemy, this.x, this.y, this.w, this.w);
  }

  // end game if asteroid hits player
  checkCollision(player) {
    if (!(this.x - this.w/2 > player.x + player.w/2 || this.x + this.w/2 < player.x - player.w/2 || this.y - this.h/2 > player.y + player.h/2 || this.y + this.h/2 < player.y - player.h/2)) {
        end = true;
        play = false;
    }
  }
}

// for background
class Star {

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = random(1,6);
    this.speed = random(0,2);
  }

  display() {
    this.x -= this.speed;
    // wrap around
    if (this.x < 0) {
      this.x = width + 12;
    }
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.w, this.w);
  }
}

// instructions
function showText() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(80);
  text('SPACE COOKIES', width/2, height/2 - 100);
  textSize(18);
  text("It's simple.", width/2, height/2 - 40);
  text("Just float through space and collect as many cookies as possible.", width/2, height/2);
  text("For every asteroid you dodge, you get 1 point. For every cookie you collect, you get 3 points.", width/2, height/2 + 40);
  text("Press 'E' to go easy, 'M' for medium difficulty, or 'H' if you think you can handle hard.", width/2, height/2 + 80);
  text("Use WASD keys to move your character.", width/2, height/2 + 120);
  text("If you hit an asteroid, you lose.", width/2, height/2 + 160);
}

// use html range slider to update enemy speeds
function updateSpeed(clickedRange) {
  // update speeds based on range
  for (let i = 0; i < enemySpeeds.length; i++) {
    enemySpeeds[i]= clickedRange.value;
  }
}
