// if user press tab key, the focus will be on the first input
document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    document.querySelector("input").focus();
  }
});
// if user press enter key, the form will be submit
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.querySelector("form").submit();
  }
});
