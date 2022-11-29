
var hoverText = "<h2>Hover over to the circle.</h2>"
var visibleMaze = false;

//main 


//$("#text").append(hoverText);
//$("#text").children("h2").remove();
var left = document.getElementById('start').offsetLeft;
console.log(left);

//functions
function start() {
    $("#text").append(hoverText);
    $("#start").html("<src img='../imgs/circle.svg'>")
}

function hoverCircle(idLocation) {
    if (visibleMaze == true) {
        console.log("hoverCircle called when maze visible")
    }
    else {
        $("#text").append(hoverText);
    }
}






//$(".maze").on("mouseover", gameOver());

//$(".questionMark").on("mouseover", question());
$(".questionMark").on("mouseover", function () {
    console.log(this.id);
}); //this console logs the Id of the question marks

// var visibleMaze = true;
// $(document).on("click", function () {
//     $(".img-maze").css("visibility", "visible");
//     $(".img-maze").css("visibility", "hidden");
// });

