<?php

class BaseCombat {

    public function getInfo($perso1, $perso2) {
        echo '<table style="width:100%">
                <tr>
                  <th>Nom</th>
                  <th>PV</th> 
                  <th>Force</th>
                  <th>Type</th>
                </tr>
                <tr>
                  <td>' . $perso1->getNom() . '</td>
                  <td>' . $perso1->getPV() . '</td> 
                  <td>' . $perso1->getForce() . '</td>
                  <td>' . $perso1->getType() . '</td>
                </tr>
                <tr>
                  <td>' . $perso2->getNom() . '</td>
                  <td>' . $perso2->getPV() . '</td> 
                  <td>' . $perso2->getForce() . '</td>
                  <td>' . $perso2->getType() . '</td>
                </tr>
              </table>';
    }

    public function annonceCombat($perso1, $perso2) {
        echo '<h1>' . $perso1->getNom() . ' VS ' . $perso2->getNom() . '</h1>';
        $this->getInfo($perso1, $perso2);
    }

    public function annonceApresFrappe($perso1, $perso2) {
        echo $perso1->getNom() . ' a ' . $perso1->getPv() . ' PV, ' . $perso2->getNom() . ' a ' . $perso2->getPv() . " PV<br><br>";
    }

    public function annonceFin($perso1, $perso2) {
        if ($perso1->isDead()) {
            echo '<h2>' . $perso2->getNom() . ' a gagné </h2>';
        } else {
            echo '<h2>' . $perso1->getNom() . ' a gagné </h2>';
        }
        $this->getInfo($perso1, $perso2);
    }

}
