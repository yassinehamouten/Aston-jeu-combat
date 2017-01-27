<?php
header('Access-Control-Allow-Origin: *');

include("Database.php");

$bdd = new PDO('mysql:host=localhost;dbname=jeu;charset=utf8', 'root', '');

if(isset($_POST["combat"]) && $_POST["combat"]!="" && isset($_POST["combattants"]) && $_POST["combattants"]!=""){
  $combat = $_POST["combat"];
  $combattants = $_POST["combattants"];
  $winner = $_POST["winner"];
  $looser = $_POST["looser"];
  $xp = $_POST["xp"];

  $joueurs = json_decode($combattants);
  $joueur1 = $joueurs[0][0];
  $joueur2 = $joueurs[1][0];

  $winner = json_decode($winner);
  $looser = json_decode($looser);

  // Ajout des joueurs
  // Joueur 1
  $query = $bdd->query('SELECT * FROM joueurs WHERE nom = "'. $joueur1 .'"', PDO::FETCH_OBJ);
  $result = $query->fetch();
  if(!$result){
    $query = $bdd->prepare("INSERT INTO joueurs (nom, lvl, xp) VALUES ('$joueur1', 1, 0);");
    $query->execute();
  }

  // Joueur 2
  $query = $bdd->query('SELECT * FROM joueurs WHERE nom = "'. $joueur2 .'"', PDO::FETCH_OBJ);
  $result = $query->fetch();
  if(!$result){
    $query = $bdd->prepare("INSERT INTO joueurs (nom, lvl, xp) VALUES ('$joueur2', 1, 0);");
    $query->execute();
  }

  // Ajout xp et victoire pour le gagnant
  $query = $bdd->query('SELECT * FROM joueurs WHERE nom = "'. $winner->nom .'"', PDO::FETCH_OBJ);
  $winner = $query->fetch();
  $query = $bdd->query('SELECT * FROM joueurs WHERE nom = "'. $looser->nom .'"', PDO::FETCH_OBJ);
  $looser = $query->fetch();

  $xpForNextLvl = $winner->lvl * 12;

  $difLVL = $looser->lvl - $winner->lvl;
  if($difLVL==0){
    $xp = $xp;
  }else if($difLVL<0){
    $xp = $xp - (-1*$difLVL);
  }else{
    $xp = $xp * ($difLVL*1.5);
  }

  $winner->xp = $winner->xp + $xp;

  if($xpForNextLvl <= $winner->xp){
    $lvl = $winner->lvl;
    $encoreLVL = true;

    while($encoreLVL){
      if($xpForNextLvl <= $winner->xp){
        $lvl++;
        $xpForNextLvl = $lvl * 12;
        $winner->xp = $winner->xp - $xpForNextLvl;
      }else{
        $encoreLVL = false;
      }
    }

    $query = $bdd->prepare("UPDATE `joueurs` SET `xp` = '$xp', lvl = $lvl, gagne = gagne + 1, xpNextLVL = $xpForNextLvl WHERE nom = '$winner->nom'");
    $query->execute();
  }else{
    $query = $bdd->prepare("UPDATE `joueurs` SET `xp` = xp + '$xp', gagne = gagne + 1 WHERE nom = '$winner->nom'");
    $query->execute();
  }
  echo $xp;


  // Ajout match perdu pour le perdant
  $query = $bdd->prepare("UPDATE `joueurs` SET perdu = perdu + 1 WHERE nom = '$looser->nom'");
  $query->execute();

  // Ajout du combat en bdd
  $query = $bdd->prepare("INSERT INTO `combat` (`id`, `combat`, combattants) VALUES (NULL, '$combat', '$combattants');");
  $query->execute();

  echo json_encode($xp);
}


?>
