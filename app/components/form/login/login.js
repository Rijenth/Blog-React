const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const errorMsg = document.getElementsByClassName("form_error-message")[0];

const form = document.getElementsByClassName("form_login")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (userNameInput.value === "" || passwordInput.value === "") {
    errorMsg.innerHTML = "Please fill out all fields";
  }
  // if it was the button to go to register page, redirect to register page and preventDefault
  if (e.submitter.id === "register") {
    window.location.href = "/register";
  }

  let loginData = new FormData();
  loginData.append("username", userNameInput.value);
  loginData.append("password", passwordInput.value);
  fetch("/api/login", {
    method: "POST",
    body: loginData,
  }).then((res) => {
    if (!res.ok) {
      errorMsg.innerHTML = "Wrong username or password";
    }
    // if res is true, redirect to home page
    if (res.ok) {
      window.location.href = "/";
    }
  });
});
