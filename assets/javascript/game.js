var playerName = "none";
var foeName = "none";
var player;
var foe;
var enemiesLeft = 3;


// var myMusic = new sound("FD.mp3");
// myMusic.play();

//console.log(player1.enemy.name);
// player1.addEnemy(player2);



//$("#stop").on("click", function () { console.log(player1.attack()); });
// $("#stop").on("click", player1.attack);


//all people in an array
//save you into a you variable

function battle(you, foe) {
    //sound fx/animation
    // decrimint foe health
    // display "you attacked [name] for [amount] damage"
    // test for case: death, go do something -> message, go to choose next foe, if none you win
    // delay
    //sound fx/animation
    // decrement your health
    // display "[name] attacked you back for [amount] damage"
    // test casae for death, etc. e.g. you lose, reset game or something idk

    // nothing more till you click again i guess
}

var doc = {
    name: "Dr. Mario",
    baseHP: 100,
    hitPoints: 100,
    baseAttack: 10,
    attackPoints: 10,
    counterAttackPoints: 5,
    color: "white",
    isAlive: true,
    box: "#docbox",
    playerpic: "url(\"assets/images/docplayer.png\")",
    foepic: "url(\"assets/images/docfoe.png\")"
}

var link = {
    name: "Link",
    baseHP: 100,
    hitPoints: 100,
    baseAttack: 10,
    attackPoints: 10,
    counterAttackPoints: 5,
    color: "green",
    isAlive: true,
    box: "#linkbox",
    playerpic: "url(\"assets/images/linkplayer.png\")",
    foepic: "url(\"assets/images/linkfoe.png\")"
}

var fox = {
    name: "Fox",
    baseHP: 100,
    hitPoints: 100,
    baseAttack: 10,
    attackPoints: 10,
    counterAttackPoints: 5,
    color: "orange",
    isAlive: true,
    box: "#foxbox",
    playerpic: "url(\"assets/images/foxplayer.png\")",
    foepic: "url(\"assets/images/foxfoe.png\")"
}

var falco = {
    name: "Falco",
    baseHP: 70,
    hitPoints: 70,
    baseAttack: 10,
    attackPoints: 10,
    counterAttackPoints: 80,
    color: "skyblue",
    isAlive: true,
    box: "#falcobox",
    playerpic: "url(\"assets/images/falcoplayer.png\")",
    foepic: "url(\"assets/images/falcofoe.png\")"
}

function fillBox(character) {
    if (playerName === "none") {
        // $("#leftCol").css("background-color", character.color);
        $("#leftCol").css("background-image", character.playerpic);
        $("#leftCol").css("background-size", "cover");
        playerName = character.name;
        player = character;
        $("#leftName").text(character.name);
        $("#leftHP").text(character.hitPoints);
        $("#messageBox").text("Select an opponent!");
        $(character.box).css("opacity", 0.5);
    }
    else if (foeName === "none" && playerName !== character.name && character.isAlive === true) {
        //$("#rightCol").css("background-color", character.color);
        $("#rightCol").css("background-image", character.foepic);
        $("#rightCol").css("background-size", "cover");
        foeName = character.name;
        foe = character;
        $("#rightName").text(character.name);
        $("#rightHP").text(character.hitPoints);
        $("#messageBox").text("FIGHT!!!");
        $(character.box).css("opacity", 0.5);
    }
}

function emptyBoxRight() {
    $("#rightCol").css("background-image", "");
    foeName = "none";
    // foe = character;
    $("#rightName").text("");
    $("#rightHP").text("");
}

function emptyBoxLeft() {
    $("#leftCol").css("background-image", "");
    playerName = "none";
    // foe = character;
    $("#leftName").text("");
    $("#leftHP").text("");
}

function updateHP() {
    $("#leftHP").text(player.hitPoints);
    $("#rightHP").text(foe.hitPoints);
}

$("#foxbox").on("click", function () {
    fillBox(fox);
})

$("#falcobox").on("click", function () {
    fillBox(falco);
})

$("#docbox").on("click", function () {
    fillBox(doc);
})

$("#linkbox").on("click", function () {
    fillBox(link);
})

$("button").mouseover(function () {
    $("button").css("cursor", "pointer");
});



$("button").on("click", function () {
    if ($("button").text() === "FIGHT") {
        if (foeName !== "none" && playerName !== "none") {
            // if (foe.hitPoints > 0) {
            foe.hitPoints -= player.attackPoints;
            $("#messageBox").text("You've dealt " + player.attackPoints + " damage to " + foe.name + "!");
            updateHP();

            if (foe.hitPoints < 1) {
                enemiesLeft--;
                $("#messageBox").text("You've defeated " + foe.name + "!");
                if (enemiesLeft > 0) {
                    $("#messageBox").append("<br />" + "Choose another opponent!");
                } else {
                    $("#messageBox").append("<br />" + "You are the champion!");
                    $("#midCol").append("<img src=\"assets/images/success.png\">");
                    $("button").text("RESET");
                }
                foe.isAlive = false;
                emptyBoxRight();

            }
            else {
                player.hitPoints -= foe.counterAttackPoints;
                $("#messageBox").append("<br />" + foe.name + " counter-attacked you for " + foe.counterAttackPoints + " damage!");
                player.attackPoints += player.baseAttack;
                updateHP();
            }
            if (player.hitPoints < 1) {
                $("#messageBox").text("You've been defeated by " + foe.name + "!");

                $("#messageBox").append("<br />" + "Try again!");
                $("#midCol").append("<img src=\"assets/images/failure.png\">");
                // foe.isAlive = false;
                emptyBoxLeft();
                $("button").text("RESET");
            }
        }
    }
    else {
        resetGame();
    }
})

console.log($("button").text());

function resetGame() {
    emptyBoxLeft();
    emptyBoxRight();
    characterReset(fox);
    characterReset(falco);
    characterReset(doc);
    characterReset(link);
    $("#messageBox").text("Choose your character!");
    $("button").text("FIGHT");
    $("#midCol").text("");
    enemiesLeft = 3;
}

function characterReset(character) {
    character.isAlive = true;
    character.attackPoints = character.baseAttack;
    character.hitPoints = character.baseHP;
    $(character.box).css("opacity", 1);
}




