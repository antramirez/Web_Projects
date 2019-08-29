/* Art inspired by https://conspicuousdesign.com/products/spherical-motion-framed-geometric-art-print*/

// width and radius vars
var w = 800;
var r = w / 2;

// x and y of circles
var a1 = 200;
var a2 = 400;
var a3 = 600;
var b1 = 542;
var b2 = 260;
var b3 = 258;
var c1 = 348;
var c2 = 593.5;
var c3 = 206.5;
var c4 = 452;
var d1 = 500;
var d2 = 228;
var d3 = 572;
var d4 = 300;

// initial scaling factor of circles
var factor = .95;

function setup() {
  createCanvas(800, 800);
  background(0);
  stroke(100,100,255);
  noFill();

  // left
  ellipse(a1,a2,r,r);
  //right
  ellipse(a3,a2,r,r);
  //bottom
  ellipse(a2,a3,r,r);
  //top
  ellipse(a2,a1,r,r);

  // top right
  ellipse(b1,b2,r,r);
  // top left
  ellipse(b3,b2,r,r);
  // bottom right
  ellipse(b1,b1,r,r);
  // bottom left
  ellipse(b3,b1,r,r);

  // other positions
  ellipse(c1,c2,r,r);
  ellipse(c1,c3,r,r);
  ellipse(c4,c3,r,r);
  ellipse(c4,c2,r,r);
  ellipse(c2,c1,r,r);
  ellipse(c2,c4,r,r);
  ellipse(c3,c1,r,r);
  ellipse(c3,c4,r,r);

  ellipse(d1,d2,r,r);
  ellipse(d1,d3,r,r);
  ellipse(d4,d2,r,r);
  ellipse(d4,d3,r,r);
  ellipse(d3,d4,r,r);
  ellipse(d3,d1,r,r);
  ellipse(d2,d1,r,r);
  ellipse(d2,d4,r,r);
}

function draw() {
  frameRate(15);
  background(0,0,0,15);


  // update scaling factor
  w = w * mouseX;
  r = r * factor;

   // make bigger or smaller depending on size, and change color on scale change
  if (r < 40) {
    factor = 1.05;
    stroke(random(255), random(255), random(255));
  }
  else if (r >= 380) {
    factor = .95;
    stroke(random(255), random(255), random(255));
  }

  // left
  ellipse(a1,a2,r,r);
  //right
  ellipse(a3,a2,r,r);
  //bottom
  ellipse(a2,a3,r,r);
  //top
  ellipse(a2,a1,r,r);

  // top right
  ellipse(b1,b2,r,r);
  // top left
  ellipse(b3,b2,r,r);
  // bottom right
  ellipse(b1,b1,r,r);
  // bottom left
  ellipse(b3,b1,r,r);

  // other positions
  ellipse(c1,c2,r,r);
  ellipse(c1,c3,r,r);
  ellipse(c4,c3,r,r);
  ellipse(c4,c2,r,r);
  ellipse(c2,c1,r,r);
  ellipse(c2,c4,r,r);
  ellipse(c3,c1,r,r);
  ellipse(c3,c4,r,r);

  ellipse(d1,d2,r,r);
  ellipse(d1,d3,r,r);
  ellipse(d4,d2,r,r);
  ellipse(d4,d3,r,r);
  ellipse(d3,d4,r,r);
  ellipse(d3,d1,r,r);
  ellipse(d2,d1,r,r);
  ellipse(d2,d4,r,r);
}

function keyPressed() {
  background(0);
}
