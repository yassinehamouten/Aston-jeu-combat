<?php

class Personnage {

    protected $force;
    protected $experience;
    protected $nom;
    protected $pv;
    protected $type;

    public function __construct($nom, $pv, $force, $type) {
        $this->nom = $nom;
        $this->pv = $pv;
        $this->force = $force;
        $this->type = $type;
    }

    public function getPV() {
        return $this->pv;
    }

    public function setPV($pv) {
        $this->pv = $pv;
    }

    public function getNom() {
        return $this->nom;
    }

    public function getForce() {
        return $this->force;
    }

    public function getType() {
        return $this->type;
    }

    public function load() {
        $this->isDead();
    }

    /*
      public function getHit($adv) {
      if ($this->isDead()) {
      echo $this->nom . " est mort!<br><br>";
      } else {
      $this->pv -= $adv->force;
      $this->load();
      }
      }
     */

    public function frapper($adv) {
        if ($this->isDead()) {
            echo "<br>" . $this->nom . " est mort, il ne peut pas attaquer!<br><br>";
        } else {
            $nbAttaques = count($this->attaques);
            $sort = $this->attaques[rand(0, $nbAttaques - 1)];
            $this->{$sort}($adv);
            $this->load();
        }
    }

    public function isDead() {
        if ($this->pv <= 0) {
            return true;
        } else {
            return false;
        }
    }

}
