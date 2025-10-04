<?php
session_start();
if (!isset($_SESSION['usuario'])) {
  header("Location: /sites/acceso-denegado.html");
  exit();
}
?>
