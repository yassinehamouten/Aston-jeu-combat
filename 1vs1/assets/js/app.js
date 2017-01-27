const urlImg = "assets/img/";

degats = [100, 300, 600, 0];
attaqueNom = ["coup simple", "coup critique", "coup spécial", "echec"];
save = [];

function Personnage(nom, pv, force, id, lvl) {
    this.nom = nom;
    this.pv = pv;
    this.pvFull = pv;
    this.force = force;
    this.id = id;
    this.lvl = lvl;
}

Personnage.prototype.getPV = function() {
    return this.pv;
};

Personnage.prototype.setPV = function(pv) {
    this.pv = pv;
}

Personnage.prototype.getNom = function() {
    return this.nom;
}

Personnage.prototype.getForce = function() {
    return this.force;
}

Personnage.prototype.getType = function() {
    return this.type;
}

Personnage.prototype.loadCombat = function() {
    this.isDead();
}

Personnage.prototype.frapper = function(adv) {
    if (this.isDead()) {
        console.log("<br>" + this.nom + " est mort, il ne peut pas attaquer!<br><br>");
    } else {
        rand = Math.round(Math.random(0, 1) * 10);
        retour = [rand];
        //console.log("rand coup : " + rand);
        if (rand == 1 && rand == 2) {
            //this.coupCritique(adv);
            degat = Math.round(degats[1] + this.force * Math.random(0, 1));
            retour[0] = 1;
            retour.push(degat);
            adv.setPV(adv.getPV() - degat);
        } else if (rand == 3) {
            //this.coupSpecial(adv);
            degat = Math.round(degats[2] + this.force * Math.random(0, 1));
            retour[0] = 2;
            retour.push(degat);
            adv.setPV(adv.getPV() - degat);
        } else if (rand == 4) {
            //this.esquive(adv);
            degat = degats[3];
            retour[0] = 3;
            retour.push(degat);
            adv.setPV(adv.getPV() - degat);
        } else {
            //this.coupSimple(adv);
            degat = Math.round(degats[0] + this.force * Math.random(0, 1));
            retour.push(degat);
            adv.setPV(adv.getPV() - degat);
            retour[0] = 0;
        }
        return retour;
        this.loadCombat();
    }
}

Personnage.prototype.coupManuel = function(adv, idCoup) {
    //console.log(window.degats);
    var degats = Math.round(window.degats[idCoup] + this.force * Math.random(0, 1));
    adv.setPV(adv.getPV() - degats);
    return degats;
}

Personnage.prototype.coupSimple = function(adv) {
    adv.setPV(adv.getPV() - 100);
}

Personnage.prototype.coupCritique = function(adv) {
    adv.setPV(adv.getPV() - 300);
}

Personnage.prototype.coupSpecial = function(adv) {
    adv.setPV(adv.getPV() - 600);
}

Personnage.prototype.isDead = function() {
    if (this.pv <= 0) {
        return true;
    } else {
        return false;
    }
}

function resetPositionPlayer(idAttaquant, idAttaque) {
    $(idAttaquant).parent().css({
        "-webkit-transform": "rotate(0deg)",
        "bottom": "0px",
        "opacity": "1"
    });
    $(idAttaque).parent().css({
        "-webkit-transform": "rotate(0deg)",
        "bottom": "0px",
        "opacity": "1"
    });
}

function frapperAnimation(attaquant, attaque, coupType) {
    idAttaquant = "#" + attaquant;
    idAttaque = "#" + attaque;
    coupType++;
    direction = "left";
    distance = "-50px";
    deg = 20;
    rotation = "rotate(-" + deg + "deg)";

    if (coupType == 3) {
        distance = "-100px";
    }
    if (coupType == 2) {
        distance = "-80px";
    }
    if (coupType == 4) {
        distance = "0px";
    }

    resetPositionPlayer(idAttaquant, idAttaque);

    if (attaque == "perso2") {
        direction = "right";
        rotation = "rotate(" + deg + "deg)";
        $(idAttaque).parent().css({
            "position": "relative",
            "right": distance,
            "-webkit-transform": rotation
        });
    } else {
        $(idAttaque).parent().css({
            "position": "relative",
            "left": distance,
            "-webkit-transform": rotation
        });
    }

    //console.log("type: " + coupType);
    $(idAttaquant).attr("src", urlImg + attaquant + "-" + coupType + ".png").show()
    setTimeout(function() {
        $(idAttaquant).attr("src", urlImg + attaquant + "-0.png").show();
    }, 200);

    setTimeout(function() {
        if (attaque == "perso2") {
            direction = "right";
            rotation = "rotate(20deg)";
            $(idAttaque).parent().css({
                "position": "relative",
                "right": "0px",
                "-webkit-transform": "rotate(0deg)"
            });
        } else {
            $(idAttaque).parent().css({
                "position": "relative",
                "left": "0px",
                "-webkit-transform": "rotate(0deg)"
            });
        }
    }, 300);
}

function randCombat(perso1, perso2) {
    rand = Math.round(Math.random(0, 1));
    if (rand == 1) {
        //combat(perso1, perso2);
    } else {
        //combat(perso2, perso1);
    }
    affichePV(perso1, perso2);
}

function combat(attaquant, attaque) {
    //console.log(attaquant);
    infoCoup = attaquant.frapper(attaque);
    //console.log(infoCoup);
    frapperAnimation(attaquant.id, attaque.id, infoCoup[0]);
    afficheDegats(infoCoup[1]);
    if (attaquant.id == "perso1") {
        affichageHistorique(attaquant.nom + " a attaqué " + attaque.nom + " avec un " + attaqueNom[infoCoup[0]] + " et lui inflige " + infoCoup[1] + " dégats", "blue");
    } else {
        affichageHistorique(attaquant.nom + " a attaqué " + attaque.nom + " avec un " + attaqueNom[infoCoup[0]] + " et lui inflige " + infoCoup[1] + " dégats", "red");
    }
    saveAsArray(attaquant.id, attaque.id, infoCoup[0], infoCoup[1]);
}

function combatManuel(attaquant, attaque, idCoup) {
    console.log("idCoup: " + idCoup);
    var degats = attaquant.coupManuel(attaque, idCoup);
    frapperAnimation(attaquant.id, attaque.id, idCoup);
    afficheDegats(degats);
    if (attaquant.id == "perso1") {
        affichageHistorique(attaquant.nom + " a attaqué " + attaque.nom + " avec un " + attaqueNom[idCoup] + " et lui inflige " + degats + " dégats", "blue");
    } else {
        affichageHistorique(attaquant.nom + " a attaqué " + attaque.nom + " avec un " + attaqueNom[idCoup] + " et lui inflige " + degats + " dégats", "red");
    }
    affichePV(attaquant, attaque);
    saveAsArray(attaquant.id, attaque.id, idCoup, degats);
}

function affichePV(attaquant, attaque) {

    idAttaquant = "#" + attaquant.id;
    idAttaque = "#" + attaque.id;
    $(idAttaquant + "PV").html(attaquant.getPV() + " PV");
    $(idAttaque + "PV").html(attaque.getPV() + " PV");

    attaquantBarre = (attaquant.getPV() / attaquant.pvFull) * 100;
    attaqueBarre = (attaque.getPV() / attaque.pvFull) * 100;

    if (attaquantBarre < 50) {
        $(idAttaquant + "BarrePV").css({
            "width": attaquantBarre + '%',
            "color": "#000"
        });
    } else {
        $(idAttaquant + "BarrePV").css({
            "width": attaquantBarre + '%',
            "color": "#FFF"
        });
    }

    if (attaqueBarre < 50) {
        $(idAttaque + "BarrePV").css({
            "width": attaqueBarre + '%',
            "color": "#000"
        });
    } else {
        $(idAttaque + "BarrePV").css({
            "width": attaqueBarre + '%',
            "color": "#FFF"
        });
    }

    $(idAttaquant + "BarrePV").html(attaquant.getPV());
    $(idAttaque + "BarrePV").html(attaque.getPV());
}

function afficheDegats(degats) {
    if (degats == 0) {
        $("#degats").html("esquivé");
    } else {
        $("#degats").html("-" + degats);
    }
}

function affichageHistorique(texte, couleur) {
    $("#historique").append("<span style=color:" + couleur + ">" + texte + "</span><br>");
}

function saveAsArray(attaquant, attaque, coupType, degats) {
    save.push([attaquant, attaque, coupType, degats]);
}

function replayCombat(attaquant, attaque, coupType, degats) {
    frapperAnimation(attaquant.id, attaque.id, coupType);
    afficheDegats(degats);
    if (attaquant.id == "perso1") {
        affichageHistorique(attaquant.nom + " a attaqué " + attaque.nom + " avec un " + attaqueNom[coupType] + " et lui inflige " + degats + " dégats", "blue");
    } else {
        affichageHistorique(attaquant.nom + " a attaqué " + attaque.nom + " avec un " + attaqueNom[coupType] + " et lui inflige " + degats + " dégats", "red");
    }
    replayFrapper(attaque, degats);
}

function replayFrapper(attaque, degats) {
    attaque.setPV(attaque.getPV() - degats);
}

function playCombat(combat, combattants) {
    console.log("Play combat: " + combat);
    console.log(combattants);
    combattant1 = combattants[0];
    combattant2 = combattants[1];

    console.log("nb coups : " + (combat.length - 1));

    perso1 = new Personnage(combattant1[0], combattant1[2], combattant1[3], combattant1[1], combattant1[4]);
    perso2 = new Personnage(combattant2[0], combattant2[2], combattant2[3], combattant2[1], combattant2[4]);

    afficheInfoCombat(perso1, perso2);

    j = 0;
    var combattre = setInterval(function(combat) {
        console.log(j);
        currentRound = combat[j];
        if ((combat.length) == j) {
            if (perso1.isDead()) {
                annonce = perso2.getNom() + ' a gagné';
                idMort = "#" + perso1.id;
                $(idMort).parent().css({
                    "position": "relative",
                    "left": "-50px",
                    "-webkit-transform": "rotate(270deg)",
                    "bottom": "-30px",
                    "opacity": "0.2"
                });
            } else {
                annonce = perso1.getNom() + ' a gagné';
                idMort = "#" + perso2.id;
                setTimeout(function() {
                    $(idMort).parent().css({
                        "position": "relative",
                        "right": "-50px",
                        "-webkit-transform": "rotate(90deg)",
                        "bottom": "-30px",
                        "opacity": "0.2"
                    });
                }, 500);
            }
            $('#annonce').text(annonce);
            clearInterval(combattre);
        } else {
            if (currentRound[0] == "perso1") {
                window.replayCombat(perso1, perso2, currentRound[2], currentRound[3]);
            } else {
                window.replayCombat(perso2, perso1, currentRound[2], currentRound[3]);
            }
        }
        affichePV(perso1, perso2);
        j++;
    }, 500, combat, j);

}

var hash = window.location.hash.substr(1);
if (hash != "" && hash != "/") {
    hash = hash.substr(1);
    $("#runFight").hide();
    if (hash.includes("players")) {
        console.log("joueurs en dev...");
        hashs = hash.split("/");
        id = hashs[1];

        $("#fight").hide();
        $("#infoPlayer").show();
        $.ajax({
            type: "GET",
            url: "http://localhost"+window.location.pathname+"getplayer.php",
            data: "idPlayer=" + id,
            success: function(data, textStatus, jqXHR) {
                data = JSON.parse(data);
                $("#infoPlayer").append("<p>Nom: " + data.nom + "</p>");
                $("#infoPlayer").append("<p>LVL: " + data.lvl + "</p>");
                $("#infoPlayer").append("<p>XP: " + data.xp + "</p>");
                $("#infoPlayer").append("<p>Comnbats gagnés: " + data.gagne + "</p>");
                $("#infoPlayer").append("<p>Comnbats perdus: " + data.perdu + "</p>");
            },
        });

    } else if (hash == "fights") {
        console.log("fights en dev...");
        console.log(hash);
        hashs = hash.split("/");
        id = hashs[1];

        $("#oldFights").hide();
        $("#runFight").hide();
        $("#joueursListe").hide();
        $("#fight").hide();

        getAllCombats();


    } else if (hash.includes("fights")) {
        hashs = hash.split("/");
        id = hashs[1];
        $.ajax({
            type: "GET",
            url: "http://localhost"+window.location.pathname+"getfight.php",
            data: "idCombat=" + id,
            success: function(data, textStatus, jqXHR) {
                data = JSON.parse(data);
                playCombat(JSON.parse(data.combat), JSON.parse(data.combattants));
            },
        });
    }
} else {
    $("#lancerCombat").on("click", function() {
        console.log("click");
        perso1nom = $("#perso1Nom").val();
        perso2nom = $("#perso2Nom").val();
        PVBase = 2000;
        forceBase = 100;
        console.log(perso1nom);
        console.log(perso2nom);

        $.ajax({
            type: "GET",
            url: "http://localhost"+window.location.pathname+"getplayername.php",
            dataType: 'json',
            data: {
                namePlayer: JSON.stringify(perso1nom)
            },
            success: function(data, textStatus, jqXHR) {
                perso1Lvl = data.lvl;
                perso1pv = Math.round(PVBase * (data.lvl * 0.3));
                perso1Force = Math.round(forceBase * (data.lvl * 0.3));
                $.ajax({
                    type: "GET",
                    url: "http://localhost"+window.location.pathname+"getplayername.php",
                    dataType: 'json',
                    data: {
                        namePlayer: JSON.stringify(perso2nom)
                    },
                    success: function(data, textStatus, jqXHR) {
                        //console.log(data);
                        perso2Lvl = data.lvl;
                        perso2pv = Math.round(PVBase * (data.lvl * 0.3));
                        perso2Force = Math.round(forceBase * (data.lvl * 0.3));

                        if (perso1pv < 2000) {
                            perso1pv = 2000;
                        }
                        if (perso2pv < 2000) {
                            perso2pv = 2000;
                        }

                        if (perso1Force < 100) {
                            perso1Force = 100;
                        }
                        if (perso2Force < 100) {
                            perso2Force = 100;
                        }

                        var perso1 = new Personnage(perso1nom, perso1pv, perso1Force, "perso1", perso1Lvl);
                        var perso2 = new Personnage(perso2nom, perso2pv, perso2Force, "perso2", perso2Lvl);

                        resetPositionPlayer("#" + perso1.id, "#" + perso2.id);
                        affichePV(perso1, perso2);
                        afficheInfoCombat(perso1, perso2);

                        combattantsSave = [];
                        save = [];
                        oneDead = false;

                        $("#historique").html('');
                        $("#historique").append("<h3><center>Historique</center></h3>");

                        var combattre = setInterval(function() {
                            if (perso2.isDead() || perso1.isDead()) {
                                combattantsSave.push([perso1.nom, perso1.id, perso1.pvFull, perso1.force, perso1.lvl]);
                                combattantsSave.push([perso2.nom, perso2.id, perso2.pvFull, perso2.force, perso2.lvl]);
                                oneDead = true;
                                if (perso1.isDead()) {
                                    annonce = perso2.getNom() + ' a gagné';
                                    winner = perso2;
                                    looser = perso1;
                                    idMort = "#" + perso1.id;
                                    $(idMort).parent().css({
                                        "position": "relative",
                                        "left": "-50px",
                                        "-webkit-transform": "rotate(270deg)",
                                        "bottom": "-30px",
                                        "opacity": "0.2"
                                    });
                                } else {
                                    annonce = perso1.getNom() + ' a gagné';
                                    winner = perso1;
                                    looser = perso2;
                                    idMort = "#" + perso2.id;
                                    $(idMort).parent().css({
                                        "position": "relative",
                                        "right": "-50px",
                                        "-webkit-transform": "rotate(90deg)",
                                        "bottom": "-30px",
                                        "opacity": "0.2"
                                    });
                                }

                                $('#annonce').text(annonce);
                                $.ajax({
                                    type: "POST",
                                    url: "http://localhost"+window.location.pathname+"save.php",
                                    dataType: 'json',
                                    data: {
                                        combat: JSON.stringify(save),
                                        combattants: JSON.stringify(combattantsSave),
                                        winner: JSON.stringify(winner),
                                        looser: JSON.stringify(looser),
                                        xp: 20
                                    },
                                });
                            } else {
                                //randCombat(perso1, perso2);
                                // Gestion attaque joueur
                                $(document).one("keyup", function(e) {
                                    tempsBoucleJoueur = 300;
                                    if (typeof lastHitTimePerso1 == 'undefined') {
                                        lastHitTimePerso1 = 0;
                                        coupNormalPerso1 = 0;
                                        coupCritiquePerso1 = 0;
                                        coupSpecialPerso1 = 0;
                                    }
                                    // Gestion perso1
                                    if (lastHitTimePerso1 + tempsBoucleJoueur < $.now()) {
                                        //touche a
                                        if (e.which == 65) {
                                            if (coupNormalPerso1 + 100 < $.now()) {
                                                combatManuel(perso1, perso2, 0);
                                                coupNormalPerso1 = $.now()
                                            }
                                        }
                                        // touche z
                                        if (e.which == 90) {
                                            if (coupCritiquePerso1 + 300 < $.now()) {
                                                combatManuel(perso1, perso2, 1);
                                                coupCritiquePerso1 = $.now()
                                            }
                                        }
                                        //touche e
                                        if (e.which == 69) {
                                            if (coupSpecialPerso1 + 500 < $.now()) {
                                                combatManuel(perso1, perso2, 2);
                                                coupSpecialPerso1 = $.now()
                                            }
                                        }
                                        console.log("attaque1");
                                        lastHitTimePerso1 = $.now();
                                        console.log("time: " + lastHitTimePerso1);
                                    }

                                    // Gestion perso2
                                    if (typeof lastHitTimePerso2 == 'undefined') {
                                        lastHitTimePerso2 = 0;
                                        coupNormalPerso2 = 0;
                                        coupCritiquePerso2 = 0;
                                        coupSpecialPerso2 = 0;
                                    }
                                    if (lastHitTimePerso2 + tempsBoucleJoueur < $.now()) {
                                        // touche 1
                                        if (e.which == 97) {
                                            if (coupNormalPerso2 + 100 < $.now()) {
                                                combatManuel(perso2, perso1, 0);
                                                coupNormalPerso2 = $.now()
                                            }
                                        }
                                        // touche 2
                                        if (e.which == 98) {
                                            if (coupCritiquePerso2 + 100 < $.now()) {
                                                combatManuel(perso2, perso1, 1);
                                                coupCritiquePerso2 = $.now();
                                            }
                                        }
                                        // touche 3
                                        if (e.which == 99) {
                                            if (coupSpecialPerso2 + 500 < $.now()) {
                                                combatManuel(perso2, perso1, 2);
                                                coupSpecialPerso2 = $.now()
                                            }
                                        }
                                        console.log("attaque2");
                                        lastHitTimePerso2 = $.now();
                                        console.log("time: " + lastHitTimePerso2);
                                    }
                                });
                            }
                            if (oneDead == true) {
                                clearInterval(combattre);
                            }
                        }, 500);
                    }
                });
            }
        });
    });

}

function getLimitCombats() {
    $.ajax({
        type: "GET",
        url: "http://localhost"+window.location.pathname+"getall.php",
        success: function(data, textStatus, jqXHR) {
            data = JSON.parse(data);
            afficheCombats(data);
        },
    });
}

function getAllCombats() {
    $.ajax({
        type: "GET",
        url: "http://localhost"+window.location.pathname+"getallfights.php",
        success: function(data, textStatus, jqXHR) {
            liste = JSON.parse(data);
            for (i = 0; i < liste.length; i++) {
                info = liste[i];
                combattants = JSON.parse(liste[i].combattants);
                $("#AllFights").append("<a href='/#/fights/" + info[0] + "' onclick='location.reload()'><span>Combat: " + info[0] + " " + combattants[0][0] + " VS " + combattants[1][0] + "</span></a><br>")
            }
        },
    });
}

function afficheCombats(liste) {
    for (i = 0; i < liste.length; i++) {
        info = liste[i];
        combattants = JSON.parse(liste[i].combattants);
        $("#oldFights").append("<a href='http://localhost/" + window.location.pathname + "/#/fights/" + info[0] + "' onclick='location.reload()'><span>Combat: " + info[0] + " " + combattants[0][0] + " VS " + combattants[1][0] + "</span></a><br>")
    }
}

function getAllPlayers() {
    $.ajax({
        type: "GET",
        url: "http://localhost"+window.location.pathname+"getplayers.php",
        success: function(data, textStatus, jqXHR) {
            data = JSON.parse(data);
            affichePlayers(data);
        },
    });
}

function affichePlayers(liste) {
    for (i = 0; i < liste.length; i++) {
        info = liste[i];
        $("#joueursListe").append("<a href='http://localhost/" + window.location.pathname + "/#/players/" + info.id + "' onclick='location.reload()'><span>Joueur: " + info.nom + "</span></a><br>")
    }
}

function afficheInfoCombat(perso1, perso2) {
    $("#infoCombat").html("");
    $("#infoCombat").append("<table>").append("  <tr>" +
        "<td>" + perso1.nom + "</td>" +
        "<td>" + perso2.nom + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>" + perso1.lvl + "</td>" +
        "<td>" + perso2.lvl + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>" + perso1.pv + "</td>" +
        "<td>" + perso2.pv + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>" + perso1.force + "</td>" +
        "<td>" + perso2.force + "</td>" +
        "</tr>" +
        "</table>");
}


getLimitCombats();
getAllPlayers();
