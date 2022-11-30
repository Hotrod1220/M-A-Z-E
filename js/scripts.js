
var hoverText = "<h2>Hover over to the circle to continue hacking</h2>"
var questionText = "<h2>Press the keys that you see in order.</h2>"
var visibleMaze = false;
var puzzleIndex = 0;

//main 
hoverCircle("start");
$(".questionMark").on("mouseover", question);

//functions

function hoverCircle(idName) {
    if (visibleMaze == true) {
        console.log("hoverCircle called when maze visible");
    }
    else {
        var elementPos = document.getElementById(idName).getBoundingClientRect();
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
    }
}

function question() {
    var idName = this.id;
    var puzzleWord;
    var answer = "";

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
    displayString(puzzleWord);

    $(document).on("keypress", function (e) {
        if (answer.length != puzzleWord.length) {
            answer += e.key;
            console.log(answer);
            //add input so user knows key input was taken
        }

        if (answer == puzzleWord) {
            console.log("Solved!");
            //show they got it right
        }
        else if (answer.length == puzzleWord.length) {
            //show they got it wrong
            console.log("Wrong!");
            answer = "";
            displayString(puzzleWord);
        }
    });

}

//This is the part that is not working

// function displayString(stringName) {
//     for (var i = 0; i < stringName.length; i++) {
//         var letter = "<br><h2 id='letter'>" + stringName[i] + "</h2>"
//         $("#letter").css("font-size", "70px");
//         $("#letter").css("color", "#FF0000");
//         $("#letter").css("text-align", "center");
//         $("#text").append(letter);
//         $("#letter").toggle();
//         $("#letter").delay("100").fadeToggle();
//         $("#letter").delay("100").fadeToggle();
//     }
// }

// console.log(puzzleIndex);

// function displayString(stringName) {
//     console.log(stringName[puzzleIndex]);
//     $(".letter").css("font-size", "70px");
//     $(".letter").css("color", "#FF0000");
//     $(".letter").css("text-align", "center");
//     setTimeout(function () {
//         var letter = "<br><h2 class='letter'>" + stringName[puzzleIndex] + "</h2>"
//         $("#text").append(letter);
//         $(".letter").toggle();
//         $(".letter").fadeToggle();
//         $(".letter").fadeToggle();
//         puzzleIndex++;
//         if (puzzleIndex != stringName.length) {
//             displayString(stringName);
//         }
//     }, 100);
// }



$(".maze").on("mouseover", function () {
    console.log("Touching");
});

// var visibleMaze = true;
// $(document).on("click", function () {
//     $(".img-maze").css("visibility", "visible");
//     $(".img-maze").css("visibility", "hidden");
// });

