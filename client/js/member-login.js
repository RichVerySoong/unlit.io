function memberLogin() {
    var id = document.getElementById("memberLogin").innerHTML
    if (id == "Member Login") {
      var passwordInput = document.createElement("input");
      passwordInput.type = "text";
      passwordInput.tabindex = "0";
      passwordInput.autofocus = true;
      passwordInput.id = "playerPasswordInput";
      passwordInput.placeholder = "Enter your password here";
      $("#playerNameInput").after(passwordInput);
      playerNameInput.placeholder = "Enter your username here"
      document.getElementById("memberLogin").innerHTML = "Normal Login";
    }
    else {
      $("#playerPasswordInput").remove();
      playerNameInput.placeholder = "Enter your nickname here"
      document.getElementById("memberLogin").innerHTML = "Member Login";
    }
}
$(document).ready(function() {
  var rules = $('#rules');
  function runIt() {
  rules.animate({opacity:'-=1'}, 3000);
  rules.animate({opacity:'+=1'}, 3000, runIt);
}
  runIt();
});
// function changeText() {
//   var place = 0;
//   var ruleList = ["Move your mouse to turn you character and flashlight", "Hit other ghosts with your flashlight", "Don't get hit by another ghost's flahslight", "Be the last ghost living"];
//   document.getElementById("rules").innerHTML = "HELLO";
//   runIt();
// }
