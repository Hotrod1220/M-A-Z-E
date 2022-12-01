
var hoverText = "<h2>Hover over to the circle to continue hacking</h2>"
var questionText = "<h2>Press the keys in order. It will display again if it's wrong.</h2>"
var winText = "<h2>You've successful wreaked havoc and have downloaded hundreds of cat videos</h2><h1>WooHoo!</h1><h3 class='button'>Try Again</h3>"
var loseText = "<h2><h2>Virus detected by the firewall.</h2><h1>Termination complete!</h1><h3 class='button'>Try Again</h3>"
var visibleMaze = false;
var visibleSource = false;
var elementPos;
var idName;
var puzzleWord;
var answer;
var svg;
var tries = 0;
var questionsAnswered = [false, false, false, false, false];

//main 
hoverCircle("start");
$(".questionMark").on("mouseover", question);
$(".maze, .door").on("mouseover", gameOver);

svg = document.getElementById("exit").getBoundingClientRect();
$(document).on("mouseover", function (e) {
    if (svg.bottom < e.clientY && visibleMaze == true && (questionsAnswered[0] == true && questionsAnswered[1] == true && questionsAnswered[2] == true && questionsAnswered[3] == true && questionsAnswered[4] == true))
        winGame();
});

function resizedw() {
    window.location.reload();
}
var doit;
window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
};



//functions
function hoverCircle(idName) {
    if (visibleMaze == true) {
        console.log("hoverCircle called when maze visible");
    }
    else {
        elementPos = document.getElementById(idName).getBoundingClientRect();
        $("#text-para").append(hoverText);

        $("#content").after("<img src='imgs/circle.svg' alt='Circle Image' id='circle-img' class='circle'>");

        var translationLeft = elementPos.left + 8 + "px";

        if (idName[0] == 'Q') {
            var translationTop = elementPos.top + 20 + "px";
        } else {
            var translationTop = elementPos.top - 10 + "px";
        }

        $(".circle").css("left", translationLeft);
        $(".circle").css("top", translationTop);

        $(".circle").on("mouseover", function () {
            $("#circle-img").remove();
            $(".img-maze").css("visibility", "visible");
            visibleMaze = true;
            $("#text-para h2").remove();
        });
        delete elementPos;
    }
}

function question() {
    idName = this.id;
    puzzleWord = "";
    answer = "";

    $("#text-para").append(questionText);

    $(".img-maze").css("visibility", "hidden");
    visibleMaze = false;

    if (idName[1] == 2) {
        puzzleWord = "virus"
    }
    else if (idName[1] == 3 || idName[1] == 4) {
        puzzleWord = (Math.random() + 1).toString(36).substring(8);
    }
    else {
        puzzleWord = (Math.random() + 1).toString(36).substring(7);
    }

    puzzleWordHtml = "<h3 class=letter id=letter" + idName[1] + ">" + puzzleWord + "</h3>"
    $("#text-para").append(puzzleWordHtml);
    if (idName[1] == 2) {
        $("#letter" + idName[1]).delay(4500).fadeToggle();
    }
    else {
        $("#letter" + idName[1]).delay(2500).fadeToggle();
    }

    $(document).on("keypress", function (e) {
        if (answer.length != puzzleWord.length) {
            answer += e.key;
            $(".black-background").css("box-shadow", "1em 0 .4em #006602, -1em 0 .4em #006602");
            setTimeout(function () {
                $(".black-background").css("box-shadow", "none");
            }, 300);
        }
        if (answer == puzzleWord) {
            questionsAnswered[idName[1]] = true;

            $("#text-para h2").remove();
            hoverCircle(idName);

            if (questionsAnswered[0] == true && questionsAnswered[1] == true && questionsAnswered[2] == true && questionsAnswered[3] == true && questionsAnswered[4] == true) {
                $(".door").remove();
            }

            $("#" + idName).remove();

            $(".black-background").css("box-shadow", "1em 0 .4em #00D404, -1em 0 .4em #00D404");
            setTimeout(function () {
                $(".black-background").css("box-shadow", "none");
            }, 800);

            $(document).unbind("keypress");
            tries = 0;
        } else if (answer.length == puzzleWord.length) {
            $(".black-background").css("box-shadow", "1em 0 .4em red, -1em 0 .4em red");
            setTimeout(function () {
                $(".black-background").css("box-shadow", "none");
            }, 800);

            $("#letter" + idName[1]).fadeToggle();
            $("#letter" + idName[1]).delay(2500).fadeToggle();
            answer = "";
            tries++;
            if (tries == 3)
                gameOver();
        }
    });
}

function gameOver() {
    $(".game-over").html(loseText);
    $(".game-over").css("visibility", "visible");
    $(".game-over").css("border", ".75rem solid");
    $(".game-over").css("border-color", "red");
    $(".button").on("click", function () {
        location.reload();
    });
}

function winGame() {
    $(".game-over").html(winText);
    $(".game-over").css("visibility", "visible");
    $(".game-over").css("border", ".75rem solid");
    $(".game-over").css("border-color", "#00D404");
    $(".button").on("click", function () {
        location.reload();
    });
}