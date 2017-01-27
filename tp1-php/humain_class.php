<?php

class Humain extends Personnage {

    protected $attaques = array("high_kick", "crochet");

    public function __construct($nom, $pv, $force, $type) {

        parent::__construct($nom, $pv, $force, $type);
    }

    public function high_kick($adv) {
        $degats = ($this->force*1.7);
        $adv->setPV($adv->getPV() - $degats);
        echo $this->nom . " a attaqué  $adv->nom avec un high kick. Dégats $degats<br>";
    }


    public function crochet($adv) {
        $degats = ($this->force*1.1);
        $adv->setPV($adv->getPV() - $degats);
        echo $this->nom . " a attaqué  $adv->nom avec un crochet. Dégats $degats<br>";
    }
    
}
