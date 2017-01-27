<?php
header('Access-Control-Allow-Origin: *');

include("Database.php");

$bdd = new PDO('mysql:host=localhost;dbname=jeu;charset=utf8', 'root', '');

if(isset($_GET["idCombat"]) && $_GET["idCombat"]!=""){
  $idCombat = $_GET["idCombat"];
  $query = $bdd->query("SELECT * FROM combat WHERE id = $idCombat");
  echo json_encode($query->fetch());
}


?>
