<?php

  $filepath = "/home/ar4477/public_html/webdev/Assignment6";

  // get the answers the user submitted
  $alldata = file_get_contents($filepath . "/results.txt");
  $splitdata = explode("\n", $alldata);

  $slothTotal=0;
  $aardvarkTotal=0;
  $sheepTotal=0;
  $dogTotal=0;
  $total=0;

  for ($i = 0; $i < sizeof($splitdata)-1; $i++) {
    if ($splitdata[$i] === "sloth") {
      $slothTotal++;
    } else if ($splitdata[$i] === "aardvark") {
      $aardvarkTotal++;
    } else if ($splitdata[$i] === "sheep") {
      $sheepTotal++;
    } else if ($splitdata[$i] === "dog") {
      $dogTotal++;
    }
    $total++;
  }
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Results</title>
    <style>

      body {
        font-family: 'avenir';
        background-color: rgb(170,217,246);
      }

      #results {
        width:100%;
        height:300px;
        background-color: #eee;
        font-size: 1.2em;
        /* color:; */

      }
      #sloth{
        height:50px;
        padding-top:25px;
        width:<?php echo (($slothTotal / $total)*100) . "%\n"; ?>;
        background-color: red;
        border-left: 1px solid black;
      }
      #aardvark {
        height:50px;
        padding-top:25px;
        width:<?php echo (($aardvarkTotal / $total)*100) . "%\n"; ?>;
        background-color: yellow;
        border-left: 1px solid black;
      }
      #sheep {
        height:50px;
        padding-top:25px;
        width:<?php echo (($sheepTotal / $total)*100) . "%\n"; ?>;
        background-color: blue;
        border-left: 1px solid black;
      }
      #dog {
        height:50px;
        padding-top:25px;
        width:<?php echo (($dogTotal / $total)*100) . "%\n"; ?>;
        background-color: green;
        border-left: 1px solid black;
      }

    </style>
  </head>
  <body>
    <h1>Spirit Animal Results</h1>
    <div id="results">
      <?php if ($total == 0){
        $total = 1;
      } ?>
      <div id="sloth">Sloth<?php echo "  " . round(($slothTotal / $total)*100)."%";?></div>
      <div id="aardvark">Aardvark<?php echo "  " . round(($aardvarkTotal / $total)*100)."%";?></div>
      <div id="sheep">Sheep<?php echo "  " . round(($sheepTotal / $total)*100)."%";?></div>
      <div id="dog">Dog<?php echo "  " . round(($dogTotal / $total)*100)."%";?></div>
    </div>
    <br>
    <a href="index.php">Back to Quiz</a>
  </body>
</html>
