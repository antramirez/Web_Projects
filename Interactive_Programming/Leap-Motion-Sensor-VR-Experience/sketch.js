// variable to hold a reference to our A-Frame world
var world;

// variables for objects in the scene
var box, plane;

// access to the leap
var leapController;

// array to contain all our objects
var shapes = [];

// variables to move the user around the world
var moveUserForward = false;
var moveUserForwardExplore = false;

// variables for objects placed in the scene on load
var instatiatePlace1, instatiatePlace2, instatiatePlace3, instatiatePlace4;
var box1, torusKnot1, sphere1, box2, torusKnot2, sphere2, box3, torusKnot3, sphere3, box4, torusKnot4, sphere4;
var scaleRotate1, explore1, scaleRotate2, explore2, scaleRotate3, explore3, scaleRotate4, explore4;
var wall1, wall2, wall3, wall4;

// keep track of shape to instantiate and the mode the user is in
var currShape = "box";
var mode = "place";

// speed to move user
var speed = 0.045;

// p5 sketch code for text bar to tell the user the mode they're in, their current shape, and what the clickable boxes do
var textBar = function(p) {
	p.setup = function() {
		var myCanvas = p.createCanvas(1500,100);
		myCanvas.id("modesCanvas");
	}
	p.draw = function() {
    p.background(255,150,150);
    p.textAlign(CENTER, CENTER);
    p.textSize(25);
    p.text('MODE - ' + mode + '   SHAPE - ' + currShape + '          red - place   yellow - edit   green - explore           orange - knot   pink - sphere   blue - box', p.width/2, p.height/2);
	}
}

function setup() {
	// no canvas needed
	noCanvas();

	// make a new leap object
  leapController = new Leap.Controller({enableGestures: true});

	// constantly call these functions
  leapController.loop(handleHandData);
  leapController.on('gesture', handleGestures);

	// construct A-Frame world
	world = new World('VRScene');

	// create the ground and wall planes
	makeWallsAndGround();

	// create the selector boxes on each corner to adjust mode and shapes
	makeSelectorBoxes();

	// instantiate new p5 object to use as asset for the text bar
  var textBarSketch = new p5(textBar);
  var modesBox = new Plane({
    x:0, y:2.3, z:-2,
    width: 1.5, height: .1,
    scaleX: 4.5, scaleY: 4.5,
    asset: 'modesCanvas' // the id of the canvas created in the p5 sketch
  });
	// add this text plane in front of the user
  world.camera.cursor.addChild(modesBox);
}

function draw() {
	// display all the instantiated shapes
	for (var i = 0; i < shapes.length; i++) {
		shapes[i].display();
	}
	// check if the user should be moved around the world
	if (moveUserForward || moveUserForwardExplore) {
		world.moveUserForward(speed);
	}
	// always move the user in explore mode
  if (mode === "explore") {
    moveUserForwardExplore = true;
  }
	// otherwise don't move the user unless a new object was just added to the scene
  else {
    moveUserForwardExplore = false;
  }
}
// instantiates boxes: each box corresponds to an editor
// one changes mode (place objects, edit objects, explore world)
// there are 4 towers of boxes in each corner of the VRScene
function makeSelectorBoxes() {
	box1 = new Box({
    x: 22.5,
    y: 5,
    z: 24,
    red: 0,
    green: 0,
    blue: 255,
    clickFunction: function(b) {
      currShape = "box";
    }
	});
	world.add(box1);

  box2 = new Box({
    x: -22.5,
    y: 5,
    z: 24,
    red: 0,
    green: 0,
    blue: 255,
    clickFunction: function(b) {
      currShape = "box";
    }
	});
	world.add(box2);

  box3 = new Box({
    x: 22.5,
    y: 5,
    z: -24,
    red: 0,
    green: 0,
    blue: 255,
    clickFunction: function(b) {
      currShape = "box";
    }
	});
	world.add(box3);

  box4 = new Box({
    x: -22.5,
    y: 5,
    z: -24,
    red: 0,
    green: 0,
    blue: 255,
    clickFunction: function(b) {
      currShape = "box";
    }
	});
	world.add(box4);

  sphere1 = new Box({
    x: 21.5,
    y: 5,
    z: 24,
    red: 250,
    green: 50,
    blue: 250,
    clickFunction: function(b) {
      currShape = "sphere";
    }
	});
	world.add(sphere1);

  sphere2 = new Box({
    x: -21.5,
    y: 5,
    z: 24,
    red: 250,
    green: 50,
    blue: 250,
    clickFunction: function(b) {
      currShape = "sphere";
    }
	});
	world.add(sphere2);

  sphere3 = new Box({
    x: 21.5,
    y: 5,
    z: -24,
    red: 250,
    green: 50,
    blue: 250,
    clickFunction: function(b) {
      currShape = "sphere";
    }
	});
	world.add(sphere3);

  sphere4 = new Box({
    x: -21.5,
    y: 5,
    z: -24,
    red: 250,
    green: 50,
    blue: 250,
    clickFunction: function(b) {
      currShape = "sphere";
    }
	});
	world.add(sphere4);

  torusKnot1 = new Box({
    x: 20.5,
    y: 5,
    z: 24,
    red: 250,
    green: 150,
    blue: 0,
    clickFunction: function(b) {
      currShape = "knot";
    }
	});
	world.add(torusKnot1);

  torusKnot2 = new Box({
    x: -20.5,
    y: 5,
    z: 24,
    red: 250,
    green: 150,
    blue: 0,
    clickFunction: function(b) {
      currShape = "knot";
    }
	});
	world.add(torusKnot2);

  torusKnot3 = new Box({
    x: 20.5,
    y: 5,
    z: -24,
    red: 250,
    green: 150,
    blue: 0,
    clickFunction: function(b) {
      currShape = "knot";
    }
	});
	world.add(torusKnot3);

  torusKnot4 = new Box({
    x: -20.5,
    y: 5,
    z: -24,
    red: 250,
    green: 150,
    blue: 0,
    clickFunction: function(b) {
      currShape = "knot";
    }
	});
	world.add(torusKnot4);

  instatiatePlace1 = new Box({
    x: 24,
    y: 5,
    z: 24,
    red: 255,
    green: 0,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "place";
    }
	});
	world.add(instatiatePlace1);

  instatiatePlace2 = new Box({
    x: -24,
    y: 5,
    z: 24,
    red: 255,
    green: 0,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "place";
    }
	});
	world.add(instatiatePlace2);

  instatiatePlace3 = new Box({
    x: 24,
    y: 5,
    z: -24,
    red: 255,
    green: 0,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "place";
    }
	});
	world.add(instatiatePlace3);

  instatiatePlace4 = new Box({
    x: -24,
    y: 5,
    z: -24,
    red: 255,
    green: 0,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "place";
    }
	});
	world.add(instatiatePlace4);

  scaleRotate1 = new Box({
    x: 24,
    y: 3,
    z: 24,
    red: 255,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "edit";
    }
	});
	world.add(scaleRotate1);

  scaleRotate2 = new Box({
    x: -24,
    y: 3,
    z: 24,
    red: 255,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "edit";
    }
	});
	world.add(scaleRotate2);

  scaleRotate3 = new Box({
    x: 24,
    y: 3,
    z: -24,
    red: 255,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "edit";
    }
	});
	world.add(scaleRotate3);

  scaleRotate4 = new Box({
    x: -24,
    y: 3,
    z: -24,
    red: 255,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "edit";
    }
	});
	world.add(scaleRotate4);

  explore1 = new Box({
    x: 24,
    y: 1,
    z: 24,
    red: 0,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "explore";
    }
	});
	world.add(explore1);

  explore2 = new Box({
    x: -24,
    y: 1,
    z: 24,
    red: 0,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "explore";
    }
	});
	world.add(explore2);

  explore3 = new Box({
    x: 24,
    y: 1,
    z: -24,
    red: 0,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "explore";
    }
	});
	world.add(explore3);

  explore4 = new Box({
    x: -24,
    y: 1,
    z: -24,
    red: 0,
    green: 255,
    blue: 0,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    clickFunction: function(b) {
      mode = "explore";
    }
	});
	world.add(explore4);
}

// instantiates planes for the 4 walls and ground
function makeWallsAndGround() {
	plane = new Plane({
    width: 50,
    height: 50,
    repeatX: 50,
    repeatY: 50,
    asset: 'ground',
    rotationX: -90
	});
	world.add(plane);

	wall1 = new Plane({
    z: -25,
    width: 50,
    height: 50,
    repeatX: 10,
    repeatY: 10,
    asset: 'bubbles',
    rotationX: 0
	});
	world.add(wall1);

  wall2 = new Plane({
    z: 25,
    width: 50,
    height: 50,
    repeatX: 10,
    repeatY: 10,
    asset: 'bubbles',
    rotationX: 180
	});
	world.add(wall2);

  wall3 = new Plane({
    x: -25,
    width: 50,
    height: 50,
    repeatX: 10,
    repeatY: 10,
    asset: 'bubbles',
    rotationY: 90
	});
	world.add(wall3);

  wall4 = new Plane({
    x: 25,
    width: 50,
    height: 50,
    repeatX: 10,
    repeatY: 10,
    asset: 'bubbles',
    rotationY: 270
	});
	world.add(wall4);
}

// Shape object that gets instantiated in front of the camera
// Shape is determined by what the user selects
// The user starts moving forward immediately after shape object is instantiated
// Each object has a setTimeout so that 5 seconds after the user instantiates it,
// the object gets removed from the camera view and added to the World, and
// the user stops moving forward
// Each object also has a setTimeout after 5.001 seconds to restore the original shapes colors (for some reason, the color changes to white after the first setTimeout)
// Each object also has a click function that toggles the object's
// state between selected and unselected
class Shape {
	constructor() {
		this.state = 'unselected';
		this.spinning = false;
		this.speedX = 0;
		this.speedY = 0;
		this.speedZ = 0;
    if (currShape == "box") {
      var rd = random(255);
      var gn = random(255);
      var be = random(255);
      this.shape = new Box({
  			x: 0,
  			y: 1,
  			z: -5,
  			red: rd,
  			green: gn,
  			blue: be,
  			clickFunction: function(b) {
          if (!b.state) {
            b.state = 'unselected'
          }
          if (mode === "edit" && b.state === 'unselected') {
            b.state = 'selected';
            b.setColor(0, 255, 0);
          }
          else if (mode === "edit" && b.state === 'selected'){
            b.state = 'unselected';
            b.setColor(rd, gn, be);
          }
  			}
  		});
			world.camera.cursor.addChild(this.shape);

			setTimeout(() => {
        this.newShape = new Box({
    			x: this.shape.getWorldPosition().x,
    			y: this.shape.getWorldPosition().y,
    			z: this.shape.getWorldPosition().z,
    			red: this.shape.getRed(),
    			green: this.shape.getGreen(),
    			blue: this.shape.getBlue(),
    			clickFunction: function(b) {
            if (!b.state) {
              b.state = 'unselected'
            }
            if (mode === "edit" && b.state === 'unselected') {
              b.state = 'selected';
              b.setColor(0, 255, 0);
            }
            else if (mode === "edit" && b.state === 'selected'){
              b.state = 'unselected';
              b.setColor(rd, gn, be);
            }
    			}
    		});
				world.add(this.newShape);
        world.camera.cursor.removeChild(this.shape);
				moveUserForward = false;
			}, 5000);

			setTimeout(() => {
				this.shape.setColor(this.shape.getRed(), this.shape.getGreen(), this.shape.getBlue());
			}, 5001);
    }
    else if (currShape == "sphere") {
      var rd = random(255);
      var gn = random(255);
      var be = random(255);
      this.shape = new Sphere({
  			x: 0,
  			y: 1,
  			z: -5,
  			red: rd,
  			green: gn,
  			blue: be,
  			clickFunction: function(b) {
          if (!b.state) {
            b.state = 'unselected'
          }
          if (mode === "edit" && b.state === 'unselected') {
            b.state = 'selected';
            b.setColor(0, 255, 0);
          }
          else if (mode === "edit" && b.state === 'selected'){
            b.state = 'unselected';
            b.setColor(rd, gn, be);
          }
  			}
  		});
			world.camera.cursor.addChild(this.shape);

			setTimeout(() => {
        this.newShape = new Sphere({
    			x: this.shape.getWorldPosition().x,
    			y: this.shape.getWorldPosition().y,
    			z: this.shape.getWorldPosition().z,
    			red: this.shape.getRed(),
    			green: this.shape.getGreen(),
    			blue: this.shape.getBlue(),
    			clickFunction: function(b) {
            if (!b.state) {
              b.state = 'unselected'
            }
            if (mode === "edit" && b.state === 'unselected') {
              b.state = 'selected';
              b.setColor(0, 255, 0);
            }
            else if (mode === "edit" && b.state === 'selected'){
              b.state = 'unselected';
              b.setColor(rd, gn, be);
            }
    			}
    		});
				world.add(this.newShape);
        world.camera.cursor.removeChild(this.shape);
				moveUserForward = false;
			}, 5000);

			setTimeout(() => {
				this.shape.setColor(this.shape.getRed(), this.shape.getGreen(), this.shape.getBlue());
			}, 5001);
    }
    else if (currShape == "knot") {
      var rd = random(255);
      var gn = random(255);
      var be = random(255);
      this.shape = new TorusKnot({
  			x: 0,
  			y: 1,
  			z: -5,
				scaleX: .5,
				scaleY: .5,
				scaleZ: .5,
        red: rd,
  			green: gn,
  			blue: be,
  			clickFunction: function(b) {
          if (!b.state) {
            b.state = 'unselected'
          }
          if (mode === "edit" && b.state === 'unselected') {
            b.state = 'selected';
            b.setColor(0, 255, 0);
          }
          else if (mode === "edit" && b.state === 'selected'){
            b.state = 'unselected';
            b.setColor(rd, gn, be);
          }
  			}
  		});
			world.camera.cursor.addChild(this.shape);

			setTimeout(() => {
        this.newShape = new TorusKnot({
    			x: this.shape.getWorldPosition().x,
    			y: this.shape.getWorldPosition().y,
    			z: this.shape.getWorldPosition().z,
          scaleX: .5,
  				scaleY: .5,
  				scaleZ: .5,
    			red: this.shape.getRed(),
    			green: this.shape.getGreen(),
    			blue: this.shape.getBlue(),
    			clickFunction: function(b) {
            if (!b.state) {
              b.state = 'unselected'
            }
            if (mode === "edit" && b.state === 'unselected') {
              b.state = 'selected';
              b.setColor(0, 255, 0);
            }
            else if (mode === "edit" && b.state === 'selected'){
              b.state = 'unselected';
              b.setColor(rd, gn, be);
            }
    			}
    		});
				world.add(this.newShape);
        world.camera.cursor.removeChild(this.shape);
				// when user instantiates object, they start to move forward, so stop that
				moveUserForward = false;
			}, 5000);

			setTimeout(() => {
				this.shape.setColor(this.shape.getRed(), this.shape.getGreen(), this.shape.getBlue());
			}, 5001);
    }
	}

	// display function to spin the object if the user makes it spin
	display() {
    if (this.spinning) {
      this.newShape.spinX(this.speedX);
  		this.newShape.spinY(this.speedY);
  		this.newShape.spinZ(this.speedZ);
		}
	}
}

function handleHandData(frame) {
	// map x and y of hands to screen if only one hand is in the frame
	if (frame.hands.length == 1) {
		// get the position of this hand
		var handPosition = frame.hands[0].stabilizedPalmPosition;

		// grab the x, y & z components of the hand position
		var hx = handPosition[0];
		var hy = handPosition[1];
		var hz = handPosition[2];

		// map x and y of fingers to on screen
		x = map(hx, -200, 200, 100, 400);
		y = map(hy,    0, 500, 500,   0);
	}
}

function handleGestures(gesture, frame) {
	// if a screen tap is caught and user is in place mode, create new shape
	if (frame.hands.length == 1) {
    console.log('gesture', gesture.type);
	  if (gesture.type === 'screenTap' && mode === "place") {
				console.log('new shape');
				shapes.push(new Shape());
				moveUserForward = true;
	  }
		// if the user is in edit mode, they swipe, and the object is selected,
		// then spin the object
		if (gesture.type === 'swipe' && mode === "edit") {
			var speed = gesture.speed;
			var mapped = map(speed, 120, 480, .1, 1);

			for (var i = 0; i < shapes.length; i++) {
        if (shapes[i].newShape.state === 'selected') {
          shapes[i].spinning = !shapes[0].spinning;
  				if (gesture.direction[0] < 0) {
  					shapes[i].speedY = -mapped;
  				}
  				else {
  					shapes[i].speedY = mapped;
  				}
  				if (gesture.direction[1] < 0) {
  					shapes[i].speedX = -mapped;
  				}
  				else {
  					shapes[i].speedX = mapped;
  				}
  				if (gesture.direction[0] < 0) {
  					shapes[i].speedZ = -mapped;
  				}
  				else {
  					shapes[i].speedZ = mapped;
  				}
        }
			}
		}
	}
	else if (frame.hands[0].fingers[1] && frame.hands[1].fingers[1] && mode === "edit") {
		// get the position of the two hands
		var handPosition1 = frame.hands[0].fingers[1].dipPosition;
		var handPosition2 = frame.hands[1].fingers[1].dipPosition;

		// grab the x, y & z components of the hand position
		var hx1 = handPosition1[0];
		var hy1 = handPosition1[1];
		var hz1 = handPosition1[2];

		// grab the x, y & z components of the other hand position
		var hx2 = handPosition2[0];
		var hy2 = handPosition2[1];
		var hz2 = handPosition2[2];

		// swap them so that handPosition1 is the hand on the left
		if (hx1 > hx2) {
			hx1 = handPosition2[0];
			hy1 = handPosition2[1];
			hz1 = handPosition2[2];

		 	hx2 = handPosition1[0];
		  hy2 = handPosition1[1];
		 	hz2 = handPosition1[2];
		}
		// map x and y of fingers to on screen
    var x1 = map(hx1, -200, 200, -10, 0);
    var x2 = map(hx2, -200, 200, 0, 10);

		var diff;
		if (x1 < x2) {
      diff = x2 - x1;
    }
    else {
      diff = x1 - x2;
    }
    var d = map(diff, 10, 20, 0, 3);

		// scale the objects based on distant between two fingers if object
		// is selected and the user is in edit mode
		for (var i = 0; i < shapes.length; i++) {
			shapes[i].shape.setScale(d, d, d);
      if (shapes[i].newShape.state === 'selected') {
				shapes[i].newShape.setScale(d, d, d);
			}
		}
	}
}
