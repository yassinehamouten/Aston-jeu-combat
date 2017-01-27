<?php

/**
 *
 */
class Database extends PDO
{

  public $bdd;

  function __construct(){
    $this->bdd = new PDO('mysql:host=localhost;dbname=jeu;charset=utf8', 'root', '');
    //var_dump($this);
  }

  function query($query){
    $result = $this->bdd->query($query);
    if($result){
      return $result->fetch();
    }else{
      return false;
    }
  }

  function fetchAll($query){
    $result = $this->bdd->prepare($query);
    $result->execute();
    if($result){
      return $result->fetchAll();
    }else{
      return false;
    }
  }

  function insert($query){
    $query = $this->bdd->prepare($query);
    $query->execute();
  }

}


 ?>
