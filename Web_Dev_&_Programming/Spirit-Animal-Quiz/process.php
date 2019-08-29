<?php

  if ($_POST['mood'] === "0" || $_POST['color'] === "0" || $_POST['hobby'] === "0") {
    header("Location: index.php?error=incomplete");
  }
  else {
    // determine animal
    // get the answers the user submitted
    $ans1 = $_POST['mood'];
    $ans2 = $_POST['color'];
    $ans3 = $_POST['hobby'];

    // 4 possible animals
    $sloth = 0;
    $aardvark = 0;
    $sheep = 0;
    $dog = 0;

    if ($ans1==="1") {
      $sloth++;
    } else if ($ans1==="2") {
      $aardvark++;
    } else if ($ans1==="3") {
      $sheep++;
    } else {
      $dog++;
    }

    if ($ans2==="1") {
      $sloth++;
    } else if ($ans2==="2") {
      $aardvark++;
    } else if ($ans2==="3") {
      $sheep++;
    } else {
      $dog++;
    }

    if ($ans3==="1") {
      $sloth++;
    } else if ($ans3==="2") {
      $aardvark++;
    } else if ($ans3==="3") {
      $sheep++;
    } else {
      $dog++;
    }

    $filepath = "/Users/aramirez/Documents/MAMP/webdev_assignments/Assignment6/data";

    //find winner and set set cookie
    if ($sloth >= $aardvark & $sloth >= $sheep & $sloth >=$dog) {
      $animal="sloth";
    }
    else if ($aardvark >= $sloth & $aardvark >= $sheep & $aardvark >= $dog) {
      $animal="aardvark";
    } else if ($sheep >= $sloth & $sheep >= $aardvark & $sheep >= $dog){
      $animal="sheep";
    } else if ($dog >= $aardvark & $dog >= $sheep & $dog >= $sloth) {
      $animal="dog";
    }

    file_put_contents($filepath . "/results.txt", $animal . "\n", FILE_APPEND);
    setcookie('animal', $animal);

    header('Location: index.php');

  }

?>
