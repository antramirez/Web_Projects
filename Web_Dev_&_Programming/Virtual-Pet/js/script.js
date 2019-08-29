$(document).ready(function() {
  var eyenum, eyeFileName, mouthnum, mouthFileName;
  var hunger;

  // set local storage for hunger
  if (window.localStorage.getItem('hunger') === null) {
    window.localStorage.setItem('hunger', 50);
    $('#hunger').css('width', "100px");
    hunger=50;
  }
  else {
    window.localStorage.setItem('hunger', window.localStorage.getItem('hunger'));
    $('#hunger').css('width', (2*window.localStorage.getItem('hunger')) + "px");
    hunger = window.localStorage.getItem('hunger');
  }

  // set local storage for background
  if (window.localStorage.getItem('background_image') === null) {
    window.localStorage.setItem('background_image', 'images/background1.png');
  }
  else {
    $('#container-background').attr('src', window.localStorage.getItem('background_image'));
  }

  function refreshFace() {
    if (hunger > 0) {
      eyenum = parseInt(Math.random() * 15 + 1);
      eyeFileName = 'images/eye' + eyenum + '.png';
      mouthnum = parseInt(Math.random() * 13 + 1);
      mouthFileName = 'images/mouth' + mouthnum + '.png';

      // decrease hunger by 1 every time face refreshes
      hunger-=1;

      // check if storage is cleared in the middle of user session
      if (window.localStorage.getItem('hunger') === null) {
        window.localStorage.setItem('hunger', parseInt(hunger));
      }
      else {
        window.localStorage.setItem('hunger', parseInt(window.localStorage.getItem('hunger'))-1);
      }

      $('#hunger').css('width', hunger*2 + 'px');
    }
    else {
      eyeFileName = 'images/eyes_dead.png';
      mouthFileName = 'images/mouth_dead.png';
    }
    // refresh eyes and mouth
    $('#eyes').attr('src', eyeFileName);
    $('#mouth').attr('src', mouthFileName);

    setTimeout(refreshFace, 1000);

  }
  refreshFace();

  // make buttons interactive
  $("#fast-food").hover(function(event) {
    $(this).attr('src', 'images/food_button_over.png');
    }, function(event) {
    $(this).attr('src', 'images/food_button.png');
  });
  $("#cherry").hover(function(event) {
    $(this).attr('src', 'images/cherry_button_over.png');
    }, function(event) {
    $(this).attr('src', 'images/cherry_button.png');
  });
  $("#carrot").hover(function(event) {
    $(this).attr('src', 'images/carrot_button_over.png');
    }, function(event) {
    $(this).attr('src', 'images/carrot_button.png');
    }
  );

  // increase hunger meter with food
  $("#fast-food").click(function(event) {
    hunger = checkMaxHunger(hunger, 5);
    $('hunger').css('width', hunger*2);
    window.localStorage.setItem('hunger', parseInt(hunger));
  });
  $("#cherry").click(function(event) {
    hunger = checkMaxHunger(hunger, 10);
    $('hunger').css('width', hunger*2);
    window.localStorage.setItem('hunger', parseInt(hunger));
  });
  $("#carrot").click(function(event) {
    hunger = checkMaxHunger(hunger, 20);
    $('hunger').css('width', hunger*2);
    window.localStorage.setItem('hunger', parseInt(hunger));
  });

  // let user choose background
  $(".background").click(function(event) {
    var a = $("#container-background").src;
    $("#container-background").attr('src', event.currentTarget.src);
    //set local storage
    window.localStorage.setItem('background_image', event.currentTarget.src);
  });

  // change appearance of background images
  $(".background").hover (function(event) {
    $(event.currentTarget).css('border', '5px solid black');
    }, function(event) {
    $(event.currentTarget).css('border', '5px solid white');
  });

  // validate hunger
  function checkMaxHunger(before, inc) {
    if (parseInt(before)+parseInt(inc)> 100) {
      return 100;
    }
    else {
      return (parseInt(before)+parseInt(inc));
    }
  }
});
