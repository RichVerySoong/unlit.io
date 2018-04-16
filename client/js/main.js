function memberLogin() {
    var id = document.getElementById("memberLogin").innerHTML;
    if (id == "Member Login") {
        var passwordInput = document.createElement("input");
        passwordInput.type = "text";
        passwordInput.tabindex = "0";
        passwordInput.autofocus = true;
        passwordInput.id = "playerPasswordInput";
        passwordInput.placeholder = "Enter your password here";
        $("#playerNameInput").after(passwordInput);
        playerNameInput.placeholder = "Enter your username here"
        document.getElementById("memberLogin").innerHTML = "Guest Login";
    } else {
        $("#playerPasswordInput").remove();
        playerNameInput.placeholder = "Enter your nickname here";
        document.getElementById("memberLogin").innerHTML = "Member Login";
    }
}

$(document).keydown(function(event) {
if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
        event.preventDefault();
     }
 });

$(window).bind('mousewheel DOMMouseScroll', function (event) {
       if (event.ctrlKey == true) {
       event.preventDefault();
       }
});

$(document).keydown(function(event) {
if (event.metaKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
        event.preventDefault();
     }
  });

$(window).bind('mousewheel DOMMouseScroll', function (event) {
       if (event.metaKey == true) {
       event.preventDefault();
       }

$(document).ready(function() {
    var rules = $("#rules");

    function cycle() {
        rules.animate({
            opacity: "+=2"
        }, 3000);
        rules.animate({
            opacity: "-=2"
        }, 3000, cycle);
    }
    cycle();
});

var place = 0;
var ruleList = ["Click to toggle your flashlight!", "Shine your light on other ghosts!", "Avoid other players' flashlights!", "Welcome to unlit.io!"];
var interval = setInterval(function() {
    document.getElementById("rules").innerHTML = ruleList[place % ruleList.length]
    place += 1;
}, 5000);

document.getElementById("startButton").addEventListener("click", function() {
    clearInterval(interval);
});
