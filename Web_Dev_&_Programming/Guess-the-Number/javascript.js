

var dice = ['images/dice-1.png', 'images/dice-2.png', 'images/dice-3.png', 'images/dice-4.png', 'images/dice-5.png', 'images/dice-6.png'];

var index = parseInt( Math.random() * 6 );
var roll = document.getElementById('die');
var bal= document.getElementById('balance');
var balance = parseInt(bal.innerHTML);
var guess = document.getElementById('result');
var evenButton = document.getElementById('even');
var oddButton = document.getElementById('odd');
var playAgain = document.getElementById('playAgain');

function play() {
  evenButton.style.display = 'none';
  oddButton.style.display = 'none';
  playAgain.style.display = 'inline';
}

function endGame() {
  gameover.style.display="block";
  playAgain.style.display="none";
  evenButton.style.display = 'none';
  oddButton.style.display = 'none';
}

evenButton.onclick = function() {
  index = parseInt( Math.random() * 6 );
  roll.src= dice[index];

  if (index==1 || index==3 || index==5) {
    guess.innerHTML = "You chose EVEN - you WIN!";
    balance += 10;
  }
  else {
    guess.innerHTML = "You chose EVEN - you LOSE!";
    balance -=10;
  }

  bal.innerHTML = balance;

  if (balance==0) {
    endGame();
  }
  else {
    play();
  }
}

oddButton.onclick = function() {
  newP = document.createElement('p');
  index = parseInt( Math.random() * 6 );
  roll.src = dice[index];

  if (index==0 || index==2 || index==4) {
    guess.innerHTML = "You chose ODD - you WIN!";
    balance += 10;
  }
  else {
    guess.innerHTML = "You chose ODD - you LOSE!";
    balance -= 10;
  }

  bal.innerHTML = balance;

  if (balance==0) {
    endGame();
  }
  else {
    play();
  }
}

playAgain.onclick = function() {
  roll.src = 'images/dice-unknown.png';
  evenButton.style.display = 'inline';
  oddButton.style.display = 'inline';
  playAgain.style.display = 'none';
}
