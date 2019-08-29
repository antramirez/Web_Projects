// variable to hold a reference to our A-Frame world
var world;

var boxes = [];
var spheres = [];
var rings = [];
var bricks = [];

var knot;
var moveUp; // boolean for knot movement

var container;	// to hold 2 objects

var flyingDog;
var flyingDog2;

var corgis = [];

// sounds
var pop, whoosh;

// preload sounds
function preload() {
	soundFormats('mp3', 'ogg');
	pop = loadSound('sound/pop.mp3')
	whoosh = loadSound('sound/whoosh.mp3')
}

function setup() {
	// no canvas needed
	noCanvas();

	// noise detail for Perlin noise to move objects
	noiseDetail(24);

	// construct A-Frame world
	world = new World('VRScene');

	// bricks to float in the sky with random positions and colors
	for (var i = 0; i < 20; i++) {
		bricks[i] = new Box({
      x: random(-20, 20),
      y: random(1, 20),
      z: random(-20, 20),
      red: random(255),
      green: random(255),
      blue: random(255),
      asset: 'brick',
			clickFunction: function(brick) {
				world.teleportToObject(brick);
			}
		});
		// add current brick
		world.add(bricks[i]);
	}

	// create new knot and add to world
	knot = new TorusKnot({
		x:0, y:2, z:0,
		radius: .2,
		red:random(255), green:random(255), blue:random(255)
	});
	world.add(knot);

	// create 5 rings (toruses)
	for (var i = 0; i < 3; i++) {
		rings.push(new Torus({
			x:0, y:(i+.5)*2, z:8,
			radius:1,
			scaleX:.3, scaleY: .3, scaleZ: .3,
			radiusTubular: .3,
			segmentsRadial: 10,
			red:random(255), green:random(255), blue:random(255)
		}));
		world.add(rings[i]);
	}

	// create new boxes on the ground
	for (var i = 0; i < 15; i++) {
		boxes.push(new Box({
			x:random(-20,20), y:1, z:random(-20,20),
			width: 0.5, height: 0.5, depth: 0.5,
			rotationX: 90,
			red: random(255), green: random(255), blue: random(255),
			clickFunction: function(box) {
				// play sound on click, and change color
				pop.play();
				box.setColor(random(255), random(255), random(255))
			}
		}));
		world.add(boxes[i])
	}

	// boolean to keep track whether to increase or decrease sphere radius
	var increase = true;
	// make 10 spheres
	for (var i = 0; i < 10; i++) {
		spheres.push(new Sphere({
			x:random(-30,30), y:random(5,10), z:random(-30,30),
			radius: random(1,2.8),
			red:random(255), green:random(255), blue:random(255),
			clickFunction: function(sphere) {
				// play sound and determine whether to increae or decrease radius, depending on size
				whoosh.play();
				if (increase) {
					sphere.setRadius(sphere.getRadius() + 0.2);
					if (sphere.getRadius() > 3) {
						increase = false;
					}
				}
				else {
					sphere.setRadius(sphere.getRadius() - 0.2);
					if (sphere.getRadius() < 1) {
						increase = true;
					}
				}
			}
		}));
		// add current sphere
		world.add(spheres[i]);
	}

	// create container to hold 2 flying dogs
	container = new Container3D({x:0, y:1.3, z:5});
	world.add(container);

	// 2 3D models
	flyingDog = new OBJ({
		asset: 'flyingdog_obj',
		mtl: 'flyingdog_mtl',
		x: 4,
		y: 1.3,
		z: 0,
		rotationX:0,
		rotationY:60,
		scaleX:1,
		scaleY:1,
		scaleZ:1,
	});

	flyingDog2 = new OBJ({
		asset: 'flyingdog_obj',
		mtl: 'flyingdog_mtl',
		x: -4,
		y: 1.3,
		z: 0,
		rotationX:0,
		rotationY:-130,
		scaleX:1,
		scaleY:1,
		scaleZ:1,
	});
	// add two dogs to empty container that will rotate
	container.addChild(flyingDog);
	container.addChild(flyingDog2);

	for (var i = 0; i < 10; i++) {
		// instatiate corgi at random position
		corgis.push(new Corgi(random(-20,20), random(-20,20)));
	}

	// the ground
	var p = new Plane({
		x:0, y:0, z:0,
		width:100, height:100,
		asset: 'ground',
		repeatX: 50,
		repeatY: 50,
		rotationX:-90
	});
	world.add(p);
}

function draw() {

	// move user forward if the mouse is pressed
	if (mouseIsPressed) {
		world.moveUserForward(0.03);
	}

	// set sky
	var sky = select('#theSky');
	sky.attribute('src', '#sky');

	// determine which Y direction to move the knot
	if (moveUp) {
		knot.nudge(0,.05,0);
		if (knot.getY() > 5) {
			moveUp = false;
		}
	}
	else {
		knot.nudge(0,-.05,0);
		if (knot.getY() < .5) {
			moveUp = true;
		}
	}

	// spin boxes
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].spinX(0.2);
		boxes[i].spinY(0.2);
		boxes[i].spinZ(0.2);
	}

	// spin rings
	for (var i = 0; i < rings.length; i++) {
		rings[i].spinY(.2);
	}

	// spin dogs
	container.spinY(.4);

	// move and display corgis
	for (var i = 0; i < corgis.length; i++) {
		corgis[i].moveAndDisplay();
	}
}

class Corgi {
	constructor(x,z) {
		// create Corgi object
		this.xPos = x;
		this.zPos = z;
		this.obj = new OBJ({
			asset: 'corgi_obj',
			mtl: 'corgi_mtl',
			x: this.xPos,
			y: .4,
			z: this.zPos,
			rotationX:0,
			rotationY:random(360),
			scaleX:1,
			scaleY:1,
			scaleZ:1,
		});
		world.add(this.obj)

		// set noise offsets
		this.xOffset = random(1000);
		this.zOffset = random(2000, 3000);
	}

	moveAndDisplay() {
		// increase offset
		this.xOffset += 0.05;
		this.zOffset += 0.05;

		// map noise to value between -.1 and .1
		var xToMove = map(noise(this.xOffset), 0, 1, -.1, .1);
		var zToMove = map(noise(this.zOffset), 0, 1, -.1, .1);

		// determine new position
		var newXPos = this.obj.getZ() + xToMove;
		var newZPos = this.obj.getZ() + zToMove;

		// constrain position
		if (newXPos > 20) {
			newXPos = 20;
		}
		if (newXPos < -20) {
			newXPos = -20;

		}
		if (newZPos > 20) {
			newZPos = 20;

		}
		if (newZPos < -20) {
			newZPos = -20;
		}

		// set position
		this.obj.setX(this.obj.getX() + xToMove);
		this.obj.setZ(this.obj.getZ() + zToMove);
	}
}
