<?php
header('Access-Control-Allow-Origin: *');

include("Database.php");

$bdd = new PDO('mysql:host=localhost;dbname=jeu;charset=utf8', 'root', '');

if(isset($_GET["idPlayer"]) && $_GET["idPlayer"]!=""){
  $idPlayer = $_GET["idPlayer"];
  $query = $bdd->query("SELECT * FROM joueurs WHERE id = $idPlayer");
  echo json_encode($query->fetch());
}




?>
