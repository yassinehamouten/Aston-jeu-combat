<?php

class Sorcier extends Personnage {

    protected $attaques = array("Accio", "Reducto", "Avada_Kedavra", "Confringo", "Endoloris", "Evanesco");

    public function __construct($nom, $pv, $force, $type) {

        parent::__construct($nom, $pv, $force, $type);
    }

    public function Accio($adv) {
        $adv->setPV($adv->getPV() - 200);
        $this->pv += 200;
        echo $this->nom . " a ensorcelé  $adv->nom avec le sort Accio. Il vole 200 PV à $adv->nom !<br>";
    }

    public function Reducto($adv) {
        $degats = round($adv->getPV() / 3);
        $adv->setPV($adv->getPV() - $degats);
        echo $this->nom . " a ensorcelé  $adv->nom avec le sort Reducto. $adv->nom perd $degats PV !<br>";
    }

    public function Avada_Kedavra($adv) {
        $adv->setPV(0);
        echo $this->nom . " a ensorcelé  $adv->nom avec le sort Avada Kedavra. $adv->nom meurt sur le coup !<br>";
    }

    public function Evanesco($adv) {
        $adv->setPV(0);
        echo $this->nom . " a ensorcelé  $adv->nom avec le sort Evanesco. $adv->nom a disparu !<br>";
    }

    public function Confringo($adv) {
        $adv->setPV(0);
        echo $this->nom . " a ensorcelé  $adv->nom avec le sort Confringo. $adv->nom a explosé !<br>";
    }

    public function Endoloris($adv) {
        $adv->setPV(1);
        echo $this->nom . " a ensorcelé  $adv->nom avec le sort Endoloris. $adv->nom à tellement mal qu'il ne lui reste qu'un seul Pv !<br>";
    }

}
