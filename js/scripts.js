
var hoverText = "<h2>Hover over to the circle to continue hacking</h2>"
var questionText = "<h2>Press the keys that you see in order.</h2>"
var visibleMaze = false;
var elementPos;
var idName;
var puzzleWord;
var answer;

//main 
hoverCircle("start");
$(".questionMark").on("mouseover", question);

//functions

function hoverCircle(idName) {
    if (visibleMaze == true) {
        console.log("hoverCircle called when maze visible");
    }
    else {
        elementPos = document.getElementById(idName).getBoundingClientRect();
        $("#text").append(hoverText);

        $("#content").after("<img src='../imgs/circle.svg' alt='Circle Image' id='circle-img' class='circle'>");

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
            $("#text h2").remove();
        });
        delete elementPos;
    }
}

function question() {
    idName = this.id;
    puzzleWord = "";
    answer = "";

    $("#text").append(questionText);

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

    console.log(puzzleWord);

    // var letter = "<br><h2 class='letter'>"
    // for (var i = 0; i < puzzleWord.length; i++) {
    //     var character = letter + puzzleWord[i] + "</h2>"
    //     displayString(character, i);
    //     $(".letter").remove();
    // }

    $(document).on("keyup", function (e) {
        // console.log("Before Adding Puzzle: ", puzzleWord);
        // console.log("Before Adding Answer: ", answer);
        console.log(e.key);
        if (answer.length != puzzleWord.length) {
            answer += e.key;
            console.log("answer", answer);
            //add input so user knows key input was taken
        }
        if (answer == puzzleWord) {
            // console.log("Right Puzzle: ", puzzleWord);
            // console.log("Right: ", answer);

            $("#text h2").remove();
            hoverCircle(idName);

            $("#" + idName).remove();

            //show they got it right
            console.log("Solved!");
        } else if (answer.length == puzzleWord.length) {
            // console.log("Wrong Puzzle: ", puzzleWord);
            // console.log("Wrong Answer: ", answer);

            //show they got it wrong
            console.log("Wrong!");

            // for (var i = 0; i < puzzleWord.length; i++) {
            //     var character = letter + puzzleWord[i] + "</h2>"
            //     displayString(character, i);
            //     $(".letter").remove();
            // }
            answer = "";
        }
    });
}

//This is the part that is not working

// function displayString(letterChar, index) {
//     setTimeout(function () {
//         $("#text").append(letterChar);
//         $(".letter").fadeToggle();
//     }, 1000 * index);
// }

$(".maze").on("mouseover", function () {
    console.log("Touching");
});

// var visibleMaze = true;
// $(document).on("click", function () {
//     $(".img-maze").css("visibility", "visible");
//     $(".img-maze").css("visibility", "hidden");
// });

