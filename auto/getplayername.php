<?php
header('Access-Control-Allow-Origin: *');

include("Database.php");

$bdd = new PDO('mysql:host=localhost;dbname=jeu;charset=utf8', 'root', '');

if(isset($_GET["namePlayer"]) && $_GET["namePlayer"]!=""){
  $namePlayer = json_decode($_GET["namePlayer"]);
  $query = $bdd->query("SELECT * FROM joueurs WHERE nom = '$namePlayer'");
  $result = $query->fetch();

  if(!$result){
    $query = $bdd->prepare("INSERT INTO joueurs (nom, lvl, xp) VALUES ('$namePlayer', 1, 0);");
    $query->execute();
    $query2 = $bdd->query("SELECT * FROM joueurs WHERE nom = '$namePlayer'");
    $result = $query2->fetch();
  }
  echo json_encode($result);
}




?>
