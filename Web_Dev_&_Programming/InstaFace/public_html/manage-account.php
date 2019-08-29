<?php
  session_start();
  include ('config.php');

  $u = $_SESSION['username'];
  $p = $_POST['password'];
  $f = $_POST['firstname'];
  $l = $_POST['lastname'];
  $privacy = $_POST['privacy'];

  // update session variables
  $_SESSION['firstname'] = $f;
  $_SESSION['lastname'] = $l;
  $_SESSION['password'] = $p;

  // create a file for the user under their username
  $filename = $u . '.txt';

  // build the contents for their client record
  $record = $u . "\n" . md5($p . 'secretkey') . "\n". $f . "\n" . $l;

  // send them to the main screen so they can log into their account
  file_put_contents($users_path.'/'.$filename, $record);

  // add private.txt to uploads file if user decides to be private
  if ($privacy === 'private') {
    file_put_contents($uploads_path . '/' . $u . '/private.txt' , 'private');
  }
  else {

    // check if private.txt already exists. if it does, delete it. if it doesn't, do nothing
    if (file_exists($uploads_path . '/' . $u . '/private.txt')) {
        unlink($uploads_path . '/' . $u . '/private.txt');
    }

  }


  header("Location: index.php?account=updated");

 ?>
