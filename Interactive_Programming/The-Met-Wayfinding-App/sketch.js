// represents every node in graph, whether it be a point between exhibits or the exhibit itself
class Node {
  constructor(name,x,y, neighbors) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.neighbors = neighbors
    this.prev = undefined
    this.searched = false
  }
}

// class inspired by Craig Kapp's "Creature" in A* code
class Dot {
  constructor(x,y,desiredX,desiredY) {
    this.x = x;
    this.y = y;
    this.desiredX = desiredX
    this.desiredY = desiredY
    this.done = false
  }

  move() {
    // draw dots until they reach next node
    if (!this.done){
      fill(0,0,255)
      ellipse(this.x, this.y, 2)

      // move towards next node's position
      if (this.x < this.desiredX) {
        this.x += 1;
      }
      else if (this.x > this.desiredX) {
        this.x -= 1;
      }
      if (this.y < this.desiredY) {
        this.y += 1;
      }
      else if (this.y > this.desiredY) {
        this.y -= 1;
      }
    }

    // stop drawing
    if (dist(this.x, this.y, this.desiredX, this.desiredY) < 1) {
      this.x = this.desiredX;
      this.y = this.desiredY;
      this.done = true
    }
  }
}


// images
var mapImg;
var elevatorImg;
var cafeImg;
var restroomImg;
var assistiveAudioImg;
var exitImg;

var launch; // DOM reference
var w;  // width of screen
var h;  // height of screen

// nodes in graph
var startNode = new Node("Start", 169, 200, [])
var ghNode = new Node("The Great Hall", 169, 183, []);
var garRNode = new Node("right of Greek", 67, 183, [])
var garNode = new Node("Greek and Roman Art", 43, 183, [])
var garLNode = new Node("left of Greek", 25, 183, [])
var aaoaLNode = new Node("left of africa oceania americas", 25, 127, [])
var aaoaNode = new Node("Arts of Africa, Oceania, and the Americas", 43, 127, [])
var aaoaRNode = new Node("right of africa oceania americas", 67, 127, [])
var aaoaLTNode = new Node("leftmost point between aaoa and modern", 28, 95, [])
var aaoaTopNode = new Node("point between midpoint between aaoa and modern", 59, 95, [])
var aaoaRTNode = new Node("point between rightmost point between aaoa and modern", 67, 95, [])
var modernLNode = new Node ("left of modern", 27, 66,[])
var modernNode = new Node ("Modern and Contemporary Art", 43, 66,[])
var modernRNode = new Node ("right of modern", 59, 66,[])
var modernToRobertNode = new Node ("between modern and robert", 109, 66, [])
var euroTopNode = new Node ("over euro", 109, 95, [])
var euroNode = new Node ("European Sculpture and Decorative Arts", 109, 118, [])
var euroBotNode = new Node ("under euro", 109, 127, [])
var robertNode = new Node("Robert Lehman Collection", 169, 42, [])
var robertMedievNode = new Node("between robert and medieval", 169, 66, [])
var medievalNode = new Node("Medieval Art", 169, 95, [])
var medievalBLNode = new Node("bottom left of medieval", 162, 118, [])
var medievalBRNode = new Node("bottom right of medieval", 176, 118, [])
var medievalBotNode = new Node("bottom right of medieval", 169, 115, [])
var ghTLNode = new Node("top left of great hall", 162, 170, [])
var ghTopNode = new Node("above great hall", 169, 170, [])
var ghTRNode = new Node("top right of great hall", 176, 170, [])
var ghRNode = new Node("right of great hall", 206, 183, [])
var ghRTNode = new Node("above poiny right of great hall", 206, 170, [])
var egyptNode = new Node("Egyptian Art", 293, 170, [])
var egyptTopNode = new Node("above Egyptian Art", 293, 160, [])
var egyptRNode = new Node("right of Egyptian Art", 310, 170, [])
var egyptTRNode = new Node("top right of Egyptian Art", 310, 160, [])
var americanRNode = new Node("right of american wing", 293, 95, [])
var americanNode = new Node("The American Wing", 248, 95, [])
var armsNode = new Node("Arms and Armor", 248, 118, [])


// set each node's neighbors
startNode.neighbors.push(ghNode);
ghNode.neighbors.push(garRNode, ghTLNode, ghTopNode, ghTRNode, ghRNode)
garRNode.neighbors.push(ghNode, garNode)
garNode.neighbors.push(garRNode, garLNode)
garLNode.neighbors.push(garNode, aaoaLNode)
aaoaLNode.neighbors.push(aaoaLTNode, aaoaNode, garLNode)
aaoaLTNode.neighbors.push(aaoaLNode, aaoaTopNode, modernLNode)
aaoaNode.neighbors.push(aaoaLNode, aaoaRNode)
aaoaRNode.neighbors.push(aaoaNode, garRNode, euroBotNode, aaoaRTNode)
aaoaRTNode.neighbors.push(aaoaTopNode, aaoaRNode, euroTopNode)
modernLNode.neighbors.push(modernNode, aaoaLTNode)
modernNode.neighbors.push(modernLNode, modernRNode)
modernRNode.neighbors.push(modernNode, aaoaTopNode)
euroTopNode.neighbors.push(euroNode, medievalNode, modernToRobertNode)
euroNode.neighbors.push(euroTopNode, euroBotNode, medievalBLNode)
euroBotNode.neighbors.push(euroNode, aaoaRNode)
modernToRobertNode.neighbors.push(euroTopNode, robertMedievNode)
robertMedievNode.neighbors.push(modernToRobertNode, robertNode, medievalNode)
robertNode.neighbors.push(robertMedievNode)
medievalNode.neighbors.push(robertMedievNode, euroTopNode, americanNode, medievalBotNode)
medievalBotNode.neighbors.push(medievalNode, medievalBLNode, medievalBRNode)
medievalBLNode.neighbors.push(euroNode, medievalBotNode, medievalBRNode, ghTLNode)
medievalBRNode.neighbors.push(medievalBotNode, medievalBLNode, armsNode)
ghTLNode.neighbors.push(ghTopNode, medievalBLNode)
ghTopNode.neighbors.push(ghTLNode, ghTRNode, ghNode, medievalBotNode)
ghTRNode.neighbors.push(ghTopNode, medievalBRNode)
americanNode.neighbors.push(medievalNode, armsNode, americanRNode)
armsNode.neighbors.push(americanNode, medievalBRNode)
americanRNode.neighbors.push(americanNode, egyptTopNode)
egyptTopNode.neighbors.push(egyptTRNode, americanRNode)
egyptTRNode.neighbors.push(egyptRNode, egyptTopNode)
egyptRNode.neighbors.push(egyptTRNode, egyptNode)
egyptNode.neighbors.push(egyptRNode, ghRTNode)
ghRTNode.neighbors.push(ghRNode, egyptNode)
ghRNode.neighbors.push(ghNode, ghRTNode)


// array of node objects
var nodes = [startNode, ghNode, garRNode, garNode, garLNode, aaoaLNode, aaoaLTNode, aaoaNode, aaoaRNode, aaoaRTNode, modernLNode, modernNode, modernRNode, euroTopNode, euroNode, euroBotNode, modernToRobertNode, robertNode, robertMedievNode, medievalNode, medievalBotNode, medievalBLNode, medievalBRNode, ghTLNode, ghTopNode, ghTRNode, americanNode, armsNode, americanRNode, egyptTopNode, egyptTRNode, egyptRNode, egyptNode, ghRTNode, ghRNode]

// arrays of coordinates of additional route features
/* PLEASE NOTE THERE ARE CURRENTLY ONLY 5 ADDITIONAL ROUTE IMAGES */
var restrooms = [{x: 71, y: 92}, {x: 133, y: 83}, {x: 305, y: 88}, {x: 232, y: 194},]
var elevators = [{x: 51, y: 92}, {x: 81, y: 92}, {x: 158, y: 62}, {x: 180, y: 62}, {x: 283, y: 92}, {x: 273, y: 122}, {x: 192, y: 142}, {x: 272, y: 171}, {x: 80, y: 192},]
var cafes = [{x: 83, y: 60}, {x: 244, y: 60}]
var exits = [{x: 169, y: 201}]
var assistiveAudio = [{x: 69, y: 92}, {x: 240, y: 157}, {x: 145, y: 174},]


// curr path contains path between 2 points, total path contains every point in the route,, dots contain Dot objects to be drawn between nodes
var currPath = []
var totalPath = []
var dots = []

// app states
var startSearch = false
var startDrawing = false
var doneDrawingFts = false
var cleared = false

// this function performs a breadth first search between 2 points
// it gets called in script.js when the user clicks "make my route"
function bfs(start, end) {
  console.log("start", start);
  console.log("end", end);
  var s = start
  var e = end
  var queue = []

  // mark start node as search and add it to the visited queue
  s.searched = true
  queue.push(s)

  // while there are nodes to search
  while (queue.length > 0) {
    var curr = queue.shift()
    // break if end node found
    if (curr == e) {
      break
    }
    // check unvisited nodes' neighbors and mark them
    for (var i = 0; i < curr.neighbors.length; i++) {
      var neighbor = curr.neighbors[i]
      if (!neighbor.searched) {
        neighbor.searched = true
        // get reference to connecting node
        neighbor.prev = curr
        queue.push(neighbor)
      }
    }
  }

  // traverse nodes' previous neighbors in reverse
  currPath = []
  currPath.push(e)
  var next = e.prev
  while (next != null) {
    currPath.push(next)
    next = next.prev
  }
  // reverse path so it is from start to end between 2 points
  currPath = currPath.reverse()

  // add current between 2 points to total path
  for (var i = 0; i < currPath.length; i++) {
      totalPath.push(currPath[i])
  }
}

// reset function for when path has been found between 2 nodes (so bfs can be done on next 2 nodes)
function reset() {
  nodes.forEach(n => {
    n.searched = false
    n.prev = undefined
  })
}

// function to return node from name of node
function getNodeFromName(name) {
  return nodes.find(n => n.name==name)
}


function preload() {
  // get reference to width of screen to create canvas with these dimensions
  launch = document.querySelector('#launch');
  w = launch.offsetWidth-30;
  h = int(w / 1.3931034483) // aspect ratio
  // load images
  mapImg = loadImage('../img/blank_map1.png')
  elevatorImg = loadImage('../img/elevator.png')
  cafeImg = loadImage('../img/cafe.png')
  restroomImg = loadImage('../img/restroom.png')
  assistiveAudioImg = loadImage('../img/assistiveAudio.png')
  exitImg = loadImage('../img/exit.png')
}

function setup() {
  // parent canvas into map div
  var myCanvas = createCanvas(w, h);
  myCanvas.parent('#mapContainer');
  imageMode(CENTER)
  image(mapImg, width/2, height/2, width, height)
  noStroke()
}

function draw() {
  // don't do anything to canvas until route has been set
  if (startSearch) {
    startSearch = false
    startDrawing = true
  }
  // state after user selects destinations
  if (startDrawing) {
    // make sure path is not empty
    if (totalPath.length > 0) {
      strokeWeight(.5)
      stroke(0,0,255)
      // this draws out the path
      for (var i = 1; i < totalPath.length-1; i++) {

        var curr = totalPath[i]
        var next = totalPath[i+1]

        frameCount = 10 // slow frameCount to see the paths being formed
        line(curr.x,curr.y, next.x, next.y)
        dots.push(new Dot(curr.x, curr.y, next.x, next.y))

        for (var i = 0; i < dots.length; i++) {
          if (!dots[i].done) {
            // only move dots if desired position not reached yet
            dots[i].move()
          }
        }
      }

      // for some reason, the dots aren't connecting between the first and second node, so I started the for loop above at the second node and drew a line between the first and second node
      strokeWeight(2)
      line(totalPath[0].x,totalPath[0].y, totalPath[1].x, totalPath[1].y)

      stroke(0,255,0)
      fill(255,0,0)
      //start node
      ellipse(totalPath[0].x, totalPath[0].y, 5)

      // draw ellipse on the destinations user chose
      for (var i = 0; i < totalPath.length; i++) {
        for (var j = 0; j < path.length; j++) {
          if (totalPath[i].name == path[j]) {
            ellipse(totalPath[i].x, totalPath[i].y, 5)
          }
        }
      }
    }

    if (addtlFts.length > 1) {
      if (!doneDrawingFts) {
        // display images for each additional route feature
        for (var i = 0; i < addtlFts.length; i++) {
          console.log('curr ft:', addtlFts[i]);
          if (addtlFts[i] === "Wheelchair Accessible") {
            elevators.forEach(e => image(elevatorImg, e.x, e.y, 10, 10))
          }
          if (addtlFts[i] === "Cafes") {
            cafes.forEach(c => image(cafeImg, c.x, c.y, 10, 10))
          }
          if (addtlFts[i] === "Restrooms") {
            restrooms.forEach(r => image(restroomImg, r.x, r.y, 10, 10))
          }
          if (addtlFts[i] === "Assistive Audio") {
            assistiveAudio.forEach(a => image(assistiveAudioImg, a.x, a.y, 10, 10))
          }
          if (addtlFts[i] === "Exits") {
            exits.forEach(e => image(exitImg, e.x, e.y, 10, 10))
          }

        }
        doneDrawingFts = true // no need to draw images over and over
      }
    }
  }
  // reset if user presses start over (in script.js)
  if (cleared) {
    clear()
    startDrawing = false
    image(mapImg, width/2, height/2, width, height)
    cleared = false
    path = []
    totalPath = []
    dots = []
    addtlFts = []
  }
}
