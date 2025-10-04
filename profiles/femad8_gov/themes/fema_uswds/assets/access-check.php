<?php
session_start();
$nivel = $_SESSION['nivel'] ?? 'basico';
if ($nivel !== 'premium') {
  header("Location: /acceso-denegado.php");
  exit();
}
?>
