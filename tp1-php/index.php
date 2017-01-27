<?php
include("base_combat.php");
include("personnage_class.php");
include("sorcier_class.php");
include("humain_class.php");

$combat = new BaseCombat();

$type = array("Sorcier", "Humain");
$nbType = count($type);
$typeRand1 = $type[rand(0, $nbType - 1)];
$typeRand2 = $type[rand(0, $nbType - 1)];

$oneDead = false;


do {
    $perso2 = new $typeRand1("Gragas", rand(500,10000), rand(100,500), $typeRand1);
    $perso1 = new $typeRand2("Vlad", rand(500,10000), rand(100,500), $typeRand2);

    $combat->annonceCombat($perso1, $perso2);

    echo "<br><br><br>";

    while (!$oneDead) {
        $rand = rand(0, 1);
        if ($rand == 1) {
            $perso1->frapper($perso2);
        } else {
            $perso2->frapper($perso1);
        }
        $combat->annonceApresFrappe($perso1, $perso2);
        if ($perso2->isDead() || $perso1->isDead()) {
            $oneDead = true;
        }
    }
} while (false);

$combat->annonceFin($perso1, $perso2);
?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
    </body>
</html>
