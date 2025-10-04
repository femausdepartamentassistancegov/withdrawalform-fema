<?php
session_start();
$token = bin2hex(random_bytes(16));
$_SESSION['token'] = $token;
$expira = time() + 300;

echo "<a href='/sites/descarga.php?token=$token&expira=$expira'>Descargar</a>";
?>
