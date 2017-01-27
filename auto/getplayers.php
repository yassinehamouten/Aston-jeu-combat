<?php
header('Access-Control-Allow-Origin: *');

include("Database.php");

$bdd = new PDO('mysql:host=localhost;dbname=jeu;charset=utf8', 'root', '');

$query = $bdd->query("SELECT * FROM joueurs ORDER BY nom ASC");
echo json_encode($query->fetchAll());


?>
