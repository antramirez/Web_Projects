<?php

  // start up the session to see if they are already logged in
  session_start();

  // if ($_SESSION['loggedin'] !== 'yes') {
  //   // send them back to the main page
  //   header("Location: index.php");
  //   exit;
  // }

?>
<!DOCTYPE html>
<html>
  <head>
    <title>Assignment #7</title>
    <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div id="container">

      <div id="header">
        <a href="index.php"><h1>InstaFace</h1></a>
        <div id="right">
          <form method="get" action="search.php">
            <?php

              // they are logged in
              if ($_SESSION['loggedin'] === 'yes') {
                print "Welcome, " . $_SESSION['firstname'];
                print ' - <a href="logout.php">logout</a>';
                print ' - <a href="account.php">manage my account - </a>';
              }

              // no one is logged in
              else {
                print '<a id="signup" href="signup.php">sign up</a> -
                       <a id="login" href="login.php">login</a> -';
              }

            ?>
            <input type="text" name="search" id="search" value="search">
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
        <br style="clear: both;">
      </div>

      <div id="content">

        <div id="content_signup">
          Edit your information down below. Make sure you see 'OK' next to every field before submitting.<br>If you do not want to change a certain field, just click in the text box to get the 'OK'.
          <form id="form_signup" method="post" action="manage-account.php">
            <p>First Name:</p>
            <input type="text" value="<?php print $_SESSION['firstname'];?>" class="name" name="firstname" id="firstname"> <span id="firstnameok"></span>
            <p>Last Name:</p>
            <input type="text" value="<?php print $_SESSION['lastname'];?>" class="name" name="lastname" id="lastname"> <span id="lastnameok"></span>

            <p>New (or same) Password:</p>
            <input type="text" name="password" id="password"> <span id="passwordok"></span>
            <br><br>
            <input type="radio" name="privacy" id="private" value="public" checked> Public
            <input type="radio" name="privacy" id="public" value="private">Private<br><br>
            <input type="submit" id="submit" name="submit" id="button_signup" style="display: none;">
          </form>
        </div>

      </div>

    </div>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript">

      $(document).ready(function() {


        // validate password (> 8 characters)
        $("#password").on("focus input focusout", function(event) {
          if (event.currentTarget.value.length < 8) {
            event.currentTarget.nextElementSibling.innerHTML = "Invalid Password";
          }
          else {
            event.currentTarget.nextElementSibling.innerHTML = "OK";
          }

          checkButton();

        });

        // validate firstname & lastname
        $(".name").on("focus input focusout", function(event) {
          if (event.currentTarget.value.length === 0) {
            event.currentTarget.nextElementSibling.innerHTML = "Invalid Name";
          }
          else {
            event.currentTarget.nextElementSibling.innerHTML = "OK";
          }

          checkButton();

        });


        // // validate username
        // $("#username").on("focus input focusout", function(event) {
        //
        //   // ask the server if we know about this username
        //   $.post(
        //          'signup-process.php',
        //          {
        //            username: event.currentTarget.value
        //          },
        //          function(data, status) {
        //            event.currentTarget.nextElementSibling.innerHTML = data;
        //            checkButton();
        //          });
        // });


        // check button status
        function checkButton() {
          var l = document.getElementById('lastnameok');
          var f = document.getElementById('firstnameok');
          var p = document.getElementById('passwordok');

          if (l.innerHTML === 'OK' &&
              f.innerHTML === 'OK' && p.innerHTML === 'OK') {
            document.getElementById('submit').style.display = 'block';
          }
          else {
            document.getElementById('submit').style.display = 'none';
          }
        }




      });


    </script>

  </body>

</html>
