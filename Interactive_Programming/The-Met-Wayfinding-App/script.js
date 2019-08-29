// arrays of paths and additional features (also accessed in sketch.js)
var path = []
var addtlFts = []

const getStartedButton = document.querySelector('#getStartedButton');
getStartedButton.addEventListener('click', showDestinations) // hides intro

const makeRouteButton = document.querySelector('#makeRoute');
makeRouteButton.addEventListener('click', makeRoute); // shows map

const modifyRouteButton = document.querySelector('#modifyRouteButton');
modifyRouteButton.addEventListener('click', modifyRoute); // shows user list of additional route features

const modifyRouteButton2 = document.querySelector('#modifyRouteButton2');
modifyRouteButton2.addEventListener('click', modifyRoute2); // actually sets the additional route features

const diffDestsButton = document.querySelector('#differentDestinations');
diffDestsButton.addEventListener('click', returnToDests); // takes user back to exhibits

const walkRouteButton = document.querySelector('#makeRoute2');
walkRouteButton.addEventListener('click', walkRoute); // hides map

// array of texts that are to be italicized upon being added to route
var itals = [];
const dests = document.querySelectorAll('.destination-name');
dests.forEach(n => {
  const name = n.innerText;
  const newThing = {};
  newThing.name = name;
  newThing.ital = false;
  itals.push(newThing);

  n.addEventListener('click', toggleInfo);
})

// add event listener to each additional feature to toggle italics
const addtlFeatures = document.querySelectorAll('.feature-name');
addtlFeatures.forEach(n => {
  const name = n.innerText;
  const newThing = {}; // object representing additional feature
  newThing.name = name;
  newThing.ital = false;
  itals.push(newThing);

  n.addEventListener('click', toggleInfo);
})

// add event listeners to buttons that add destination/additional route feature
const addDestButtons = document.querySelectorAll('.add-button-dest');
addDestButtons.forEach((n) => {
  n.addEventListener('click', addDest);
});
const removeDestButtons = document.querySelectorAll('.remove-button-dest');
removeDestButtons.forEach((n) => {
  n.addEventListener('click', removeDest);
});
const addFtButtons = document.querySelectorAll('.add-button-ft');
addFtButtons.forEach((n) => {
  n.addEventListener('click', addFt);
});
const removeFtButtons = document.querySelectorAll('.remove-button-ft');
removeFtButtons.forEach((n) => {
  n.addEventListener('click', removeFt);
});

// hides intro and shows exhibits
function showDestinations() {
  const launchScreen = document.querySelector('#launch');
  launchScreen.style.display = 'none';
  const selectDestinationsScreen = document.querySelector('#selectDestinations');
  selectDestinationsScreen.style.display = 'block'
}

// hides/reveals description of exhibit
function toggleInfo(evt) {
  const name =  this;
  for (var i = 0; i < itals.length; i++) {
    if (itals[i].name === name.innerText) {
      toggleItalic(name, itals, i)
    }
  }
  if (evt.target.classList.contains('destination-name')) {
    this.parentElement.classList.toggle('dest-full-height')
  }
  else {
    this.parentElement.classList.toggle('feat-full-height')
  }
}

// toggles between italic and normal font for when a destination is added
function toggleItalic(name, itals, i) {
  if (!itals[i].ital) {
    name.style['font-style'] = 'italic';
  }
  else {
    name.style['font-style'] = 'normal';
  }
  itals[i].ital = !itals[i].ital;
}

// adds destination to path
function addDest(evt) {
  // apply red background upon being added
  evt.target.parentElement.style['background-color'] = 'rgb(228,0,42)';
  this.parentElement.classList.remove('dest-full-height')

  path.push(evt.target.parentElement.firstElementChild.innerText);

  setTimeout(() => {
    this.style.display = 'none';

    const removeButton = evt.target.nextElementSibling;
    removeButton.style.display = 'block';
  }, 800)
}

// removes destination from path
function removeDest(evt) {
  setTimeout(() => {
    this.style.display = 'none';
    const addButton = evt.target.previousElementSibling;
    addButton.style.display = 'block';
  }, 800)

  // remove red background
  evt.target.parentElement.style['background-color'] = 'rgb(208,209,211)';
  this.parentElement.classList.remove('dest-full-height')
  path.splice(path.indexOf(evt.target.parentElement.firstElementChild.innerText), 1);
}

// adds additional feature to path
function addFt(evt) {
  // apply red background to div upon being added
  evt.target.parentElement.style['background-color'] = 'rgb(228,0,42)';
  this.parentElement.classList.remove('feat-full-height')

  addtlFts.push(evt.target.parentElement.firstElementChild.innerText);

  // state in draw() of sketch.js
  doneDrawingFts = false

  setTimeout(() => {
    this.style.display = 'none';

    const removeButton = evt.target.nextElementSibling;
    removeButton.style.display = 'block';
  }, 800)

}

// removes additional feature from path
function removeFt(evt) {
  setTimeout(() => {
    this.style.display = 'none';
    const addButton = evt.target.previousElementSibling;
    addButton.style.display = 'block';
  }, 800)

  // remove red background
  evt.target.parentElement.style['background-color'] = 'rgb(208,209,211)';
  this.parentElement.classList.remove('feat-full-height')
  addtlFts.splice(path.indexOf(evt.target.parentElement.firstElementChild.innerText), 1);
}

// sets original path without route features and shows appropriate container div
function makeRoute() {
  const selectDestinationsScreen = document.querySelector('#selectDestinations');
  selectDestinationsScreen.style.display = 'none';

  const routeOverview = document.querySelector('#routeOverview');
  routeOverview.style.display = 'block';

  // set boolean in sketch.js to perform bfs between every adjacent destinations in path
  startSearch = true
  var start = nodes[0]
  for (var i = 0; i < path.length; i++) {
    bfs(start, getNodeFromName(path[i]))
    start = getNodeFromName(path[i])
    reset()
  }
}

// shows additional route features and hides map overview
function modifyRoute() {
  const routeOverview = document.querySelector('#routeOverview');
  routeOverview.style.display = 'none';
  const modifyRoute = document.querySelector('#modifyRoute');
  modifyRoute.style.display = 'block';
}

// shows route overview and hides additional route features
function modifyRoute2() {
  // change divs to display
  const modifyRoute2 = document.querySelector('#modifyRoute');
  modifyRoute2.style.display = 'none';

  const routeOverview = document.querySelector('#routeOverview');
  routeOverview.style.display = 'block';
}

// resets everything and goes back to intro screen
function returnToDests() {
  const routeOverview = document.querySelector('#routeOverview');
  routeOverview.style.display = 'none';
  const selectDestinationsScreen = document.querySelector('#selectDestinations');
  selectDestinationsScreen.style.display = 'block';

  const allExhibits = document.querySelectorAll('.destination-container')
  allExhibits.forEach(n => {
    n.style['background-color'] = 'rgb(208,209,211)'
    n.lastElementChild.innerText = 'Add to Route'
  })

  const allMods = document.querySelectorAll('.feature-container')
  allMods.forEach(n => {
    n.style['background-color'] = 'rgb(208,209,211)'
    n.lastElementChild.innerText = 'Add to Route'
  })

  // set boolean to reset everything, including canvas
  cleared = true
}

// hide buttons and only show map and path
function walkRoute(evt) {
  // only show map
  evt.target.style.display = 'none'
  const modifyRouteButton = document.querySelector('#modifyRouteButton');
  modifyRouteButton.style.display = 'none';
  const diffDestsButton = document.querySelector('#differentDestinations');
  diffDestsButton.style.display = 'none';

  path.forEach(n => {
    const d = document.createElement('div');
    d.classList.add('path-dest');
    d.textContent = n;
    const pathDiv = document.querySelector('#path');
    pathDiv.appendChild(d);
    pathDiv.style.display = 'block';
  })
}
