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
      document.getElementById("memberLogin").innerHTML = "Normal Login";
    }
    else {
      $("#playerPasswordInput").remove();
      document.getElementById("memberLogin").innerHTML = "Member Login";
    }
}
