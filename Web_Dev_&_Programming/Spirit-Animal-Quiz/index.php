<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Spirit Animal Quiz</title>
    <style>
      body {
        margin: auto;
        text-align: center;
        font-family: 'avenir';
        background-color: rgb(170,217,246);
        width:90%;
      }
      #container {
        margin:auto;
        width: 270px;
        height: 290px;
        border: 5px blue solid;
      }
    </style>
  </head>
  <body>

    <h1>What is Your Spirit Animal?</h1>
    <div id="container">

      <?php

        if ($_COOKIE['animal']) {
          echo "You got " . $_COOKIE['animal'] . ".";
          echo '<img style="width:100%;" src="images/' . $_COOKIE['animal'] . '.png">';
          echo '<button><a style="text-decoration:none;" href="tryagain.php">Try again</a></button>';
        }
        else {
          echo <<< EOF
          <form action="process.php" method="POST">

            What's your mood?
            <br>
            <select id="mood" name="mood">
              <option value="0">Select an answer</option>
              <option value="1">Sleepy</option>
              <option value="2">Bored</option>
              <option value="3">Fine</option>
              <option value="4">Ecstatic</option>
            </select><br><br>

            Who's your favorite color?
            <br>
            <select id="color" name="color">
              <option value="0">Select an answer</option>
              <option value="1">Blue</option>
              <option value="2">Red</option>
              <option value="3">Green</option>
              <option value="4">Other</option>
            </select><br><br>

            What's your favorite hobby?
            <br>
            <select id="hobby" name="hobby">
              <option value="0">Select an answer</option>
              <option value="1">Video Games</option>
              <option value="2">Drawing</option>
              <option value="3">Reading</option>
              <option value="4">Sports</option>
            </select><br><br>

            <input type="submit" name="submit" value="Show me the results!">

          </form>

EOF;

        }

        // look for incomplete error flag
        if ($_GET['error'] === 'incomplete') {
            echo "<p style='color:red;'>Error. Please answer all questions<br><br>";
          }
      ?>
    </div>

      <br>
      <a href="results.php">See aggregate results</a>

  </body>
</html>
