<?php
  setcookie('animal', '', time() -3600);
  header('Location: index.php');
?>
