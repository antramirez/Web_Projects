var tabs = document.getElementsByClassName('tab');

// create arrays and counters for each cookie amount
var totalThinMintsArr = [];
var totalThinMints = 0;
var totalTagalongsArr = [];
var totalTagalongs = 0;
var totalSamoasArr = [];
var totalSamoas = 0;

var boxes = sum('Thin Mints' , totalThinMintsArr) + sum('Tagalongs', totalTagalongsArr) + sum('Samoas' , totalSamoasArr);


for (var i = 0; i < tabs.length; i++) {

  tabs[i].addEventListener('click', function(event) {
    var currentActive = document.querySelector('.active');
    currentActive.classList.remove('active');
    event.currentTarget.classList.add('active');

    var allContent = document.querySelectorAll('.content');
    for (var i = 0; i < allContent.length; i++) {
      allContent[i].classList.add('hidden');

    }
   var currentContentId = "#" + event.currentTarget.firstElementChild.dataset.content;
   event.currentTarget.firstElementChild.dataset.content;
   document.querySelector(currentContentId).classList.remove('hidden');
  });
}

// create a list for items to be added in cart
var cart = document.createElement('ul');
// set counter for total
var total = 0;
var totalCost = document.getElementById('total');

var cartItemTM = document.createElement('li');
var cartItemT = document.createElement('li');
var cartItemS = document.createElement('li');
var cartAllItems = [cartItemTM, cartItemT, cartItemS];

var buttons = document.querySelectorAll('button');
var tagalongAmt = document.getElementById('tagalong').value;
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(event) {
    event.preventDefault();
    // find which dropdown was just selected
    var curDropdownId = document.getElementById(event.currentTarget.previousElementSibling.id);
    var amt = curDropdownId.value;
    var cookieName = event.currentTarget.parentElement.previousElementSibling.children[0].innerHTML;

    // on the shopping page, get reference to where to display what was added to cart
    var textToShow = event.currentTarget.parentElement.lastElementChild;
    textToShow.style.display = 'inline';

    if (amt==0) {
      textToShow.style.color = 'red';
      textToShow.innerHTML = 'Please select a valid quantity';
    }

    else {
      // remove message that says cart is empty once item is added
      document.getElementById('summary').innerHTML = "";
      // get reference to cart page
      var summary = document.getElementById('summary');

      // Thin mint remove functionality
      var removeTM = document.createElement('a');
      removeTM.style.margin='0px';
      removeTM.style.color='red';
      removeTM.style['text-decoration']='none';
      removeTM.href = '#';
      removeTM.innerHTML = '  Remove';

      removeTM.addEventListener('click', function(event) {
        var newFormTM = document.createElement('form');
        newFormTM.innerHTML = 'Are you sure?';
        cartItemTM.append(newFormTM);

        removeTM.style.display = 'none';

        var removeAllTM = document.createElement('button');
        removeAllTM.innerHTML = 'Yes';
        removeAllTM.type='button';
        removeAllTM.style.margin = '1px';

        removeAllTM.addEventListener('click', function(event) {
          cartItemTM.remove(cartItemTM);
          total = total - 5 * sum(totalThinMints, totalThinMintsArr);
          boxes = boxes - sum(totalThinMints, totalThinMintsArr);
          if (boxes > 0) {
            document.getElementById('tab2').firstElementChild.innerHTML = ' (' + boxes + ')';
          }
          else {
            document.getElementById('tab2').firstElementChild.innerHTML = '';
            document.getElementById('summary').innerHTML += 'There are currently no items in your cart';
          }

          totalThinMints = 0;
          totalThinMintsArr = [];
          totalCost.innerHTML = total;
        });

        var cancelRemoveTM = document.createElement('button');
        cancelRemoveTM.innerHTML = 'No';
        cancelRemoveTM.type='button';
        cancelRemoveTM.style.margin = '1px';

        cancelRemoveTM.addEventListener('click' , function(event) {
            newFormTM.remove(newFormTM);
            removeTM.style.display = 'inline';
        });

        newFormTM.append(removeAllTM);
        newFormTM.append(cancelRemoveTM);
      });

      // Tagalongs remove functionality
      var removeT = document.createElement('a');
      removeT.style.margin='0px';
      removeT.style.color='red';
      removeT.style['text-decoration']='none';
      removeT.href = '#';
      removeT.innerHTML = '  Remove';

      removeT.addEventListener('click', function(event) {
        var newFormT = document.createElement('form');
        newFormT.innerHTML = 'Are you sure?';
        cartItemT.append(newFormT);

        removeT.style.display = 'none';

        var removeAllT = document.createElement('button');
        removeAllT.innerHTML = 'Yes';
        removeAllT.type='button';
        removeAllT.style.margin = '1px';

        removeAllT.addEventListener('click', function(event) {
          cartItemT.remove(cartItemT);
          total = total - 4 * sum(totalTagalongs, totalTagalongsArr);
          boxes = boxes - sum(totalTagalongs, totalTagalongsArr);
          if (boxes > 0) {
            document.getElementById('tab2').firstElementChild.innerHTML = ' (' + boxes + ')';
          }
          else {
            document.getElementById('tab2').firstElementChild.innerHTML = '';
            document.getElementById('summary').innerHTML += 'There are currently no items in your cart';
          }

          totalTagalongs = 0;
          totalTagalongsArr = [];
          totalCost.innerHTML = total;
        });

        var cancelRemoveT = document.createElement('button');
        cancelRemoveT.innerHTML = 'No';
        cancelRemoveT.type='button';
        cancelRemoveT.style.margin = '1px';

        cancelRemoveT.addEventListener('click' , function(event) {
            newFormT.remove(newFormT);
            removeT.style.display = 'inline';
        });

        newFormT.append(removeAllT);
        newFormT.append(cancelRemoveT);
      });

      // Samoas remove functionality
      var removeS = document.createElement('a');
      removeS.style.margin='0px';
      removeS.style.color='red';
      removeS.style['text-decoration']='none';
      removeS.href = '#';
      removeS.innerHTML = '  Remove';

      removeS.addEventListener('click', function(event) {
        var newFormS = document.createElement('form');
        newFormS.innerHTML = 'Are you sure?';
        cartItemS.append(newFormS);

        removeS.style.display = 'none';

        var removeAllS = document.createElement('button');
        removeAllS.innerHTML = 'Yes';
        removeAllS.type='button';
        removeAllS.style.margin = '1px';

        removeAllS.addEventListener('click', function(event) {
          cartItemS.remove(cartItemTM);
          total = total - 3 * sum(totalSamoas, totalSamoasArr);
          boxes = boxes - sum(totalSamoas, totalSamoasArr);
          if (boxes > 0) {
            document.getElementById('tab2').firstElementChild.innerHTML = ' (' + boxes + ')';
          }
          else {
            document.getElementById('tab2').firstElementChild.innerHTML = '';
            document.getElementById('summary').innerHTML += 'There are currently no items in your cart';
          }

          totalSamoas = 0;
          totalSamoasArr = [];
          totalCost.innerHTML = total;
        });

        var cancelRemoveS = document.createElement('button');
        cancelRemoveS.innerHTML = 'No';
        cancelRemoveS.type='button';
        cancelRemoveS.style.margin = '1px';

        cancelRemoveS.addEventListener('click' , function(event) {
            newFormS.remove(newFormS);
            removeS.style.display = 'inline';
        });

        newFormS.append(removeAllS);
        newFormS.append(cancelRemoveS);
      });



      if (cookieName=="Thin Mints") {
        if (totalThinMintsArr.length===0) {
          totalThinMintsArr.push(amt);
          cartItemTM.innerHTML = cookieName + ': ' + amt;
          summary.append(cart);
          cart.append(cartItemTM);

        }
        else {
          totalThinMintsArr.push(amt);
          cartItemTM.innerHTML = cookieName + ': ' + sum(cookieName, totalThinMintsArr);
          summary.append(cart);
          cart.append(cartItemTM);

        }
        if (sum(cookieName, totalThinMintsArr) < 2) {
          cartItemTM.innerHTML += ' box @ $5 per box';
        }
        else {
          cartItemTM.innerHTML += ' boxes @ $5 per box';
        }

        cartItemTM.append(removeTM);
        total += 5 * amt;

      }
      else if (cookieName=="Tagalongs") {
        if (totalTagalongsArr.length===0) {
          totalTagalongsArr.push(amt);
          cartItemT.innerHTML = cookieName + ': ' + amt;
          summary.append(cart);
          cart.append(cartItemT);
        }
        else {
          totalTagalongsArr.push(amt);
          cartItemT.innerHTML = cookieName + ': ' + sum(cookieName, totalTagalongsArr);
          summary.append(cart);
          cart.append(cartItemT);

        }
        if (sum(cookieName, totalTagalongsArr)<2) {
          cartItemT.innerHTML += ' box @ $4 per box';
        }
        else {
          cartItemT.innerHTML += ' boxes @ $4 per box';
        }

        cartItemT.append(removeT);
        total += 4*amt;
      }
      else {
        if (totalSamoasArr.length===0) {
          totalSamoasArr.push(amt);
          cartItemS.innerHTML = cookieName + ': ' + amt;
          summary.append(cart);
          cart.append(cartItemS);
        }
        else {
          totalSamoasArr.push(amt);
          cartItemS.innerHTML = cookieName + ': ' + sum(cookieName, totalSamoasArr);
          summary.append(cart);
          cart.append(cartItemS);

        }
        if (sum(cookieName, totalSamoasArr)<2) {
          cartItemS.innerHTML += ' box @ $3 per box';
        }
        else {
          cartItemS.innerHTML += ' boxes @ $3 per box';
        }
        
        cartItemS.append(removeS);
        total += 3*amt;
      }

      // format text depending on what was selected to display on shopping page
      textToShow.style.color = 'green';
      if (amt==1) {
        textToShow.innerHTML = amt + ' box of ' + cookieName + ' added to cart';
      }
      else {
        textToShow.innerHTML = amt + ' boxes of ' + cookieName + ' added to cart';
      }
    }

    // update total cost
    totalCost.innerHTML = total;

    setTimeout(function() {
      textToShow.innerHTML="";
    }, 3500);

    // reset dropdown menu
    curDropdownId.selectedIndex='0';

    // find and show how many boxes were added to cart
    boxes = sum('Thin Mints' , totalThinMintsArr) + sum('Tagalongs', totalTagalongsArr) + sum('Samoas' , totalSamoasArr);
    if (boxes > 0) {
      document.getElementById('tab2').firstElementChild.innerHTML = ' (' + boxes + ')';
    }

  });
}

// function to sum up each cookie's array
function sum(cookie, array) {
  var count = 0;
  if (array.length != 0) {
    for (var i = 0; i < array.length; i++) {
      count += parseInt(array[i]);
      if (cookie=="Thin Mints") {
        totalThinMints += parseInt(array[i]);
      }
      else if (cookie=="Tagalongs") {
        totalTagalongs += parseInt(array[i]);
      }
      else {
        totalSamoas += parseInt(array[i]);
      }
    }
  }
  return count;
}
