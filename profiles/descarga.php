<?php
session_start();
if ($_GET['token'] === $_SESSION['token'] && time() < $_GET['expira']) {
  // acceso permitido
} else {
  echo "Enlace expirado o inválido.";
}
?>
