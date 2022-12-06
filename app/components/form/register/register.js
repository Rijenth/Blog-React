const submitBtn = document.getElementsByClassName("form_submit-btn")[0];
const usernameInput = document.getElementsByClassName("form_username-input")[0];
const firstNameInput = document.getElementsByClassName(
  "form_first-name-input"
)[0];
const lastNameInput = document.getElementsByClassName(
  "form_last-name-input"
)[0];
const emailInput = document.getElementsByClassName("form_email-input")[0];
const passwordInput = document.getElementsByClassName("form_password-input")[0];
const passwordConfirmInput = document.getElementsByClassName(
  "form_password-confirm-input"
)[0];
const genderInput = document.getElementsByClassName("form_gender-inputs")[0];
const roleInput = document.getElementsByClassName("form_role-inputs")[0];
const form = document.getElementsByClassName("form_register")[0];

const errorMsg = document.getElementsByClassName("form_error-msg")[0];

// add event listener to the form
// if any input is empty, disable the submit button

const resetErors = () => {
  setTimeout(() => {
    errorMsg.innerHTML = "";
    submitBtn.removeAttribute("disabled");
  }, 1000);
};

const areInputsGood = () => {
  if (
    usernameInput.value === "" ||
    firstNameInput.value === "" ||
    lastNameInput.value === "" ||
    emailInput.value === "" ||
    passwordInput.value === "" ||
    passwordConfirmInput.value === ""
  ) {
    submitBtn.setAttribute("disabled", "disabled");
    errorMsg.innerHTML = "Please fill out all fields";
    resetErors();
    return false;
  }
  // if the password and password confirm inputs don't match, change the error message
  if (passwordInput.value !== passwordConfirmInput.value) {
    submitBtn.setAttribute("disabled", "disabled");
    errorMsg.innerHTML = "Passwords don't match";
    resetErors();
    return false;
  }
  // add regex to check if the email is valid
  // if it's not, change the error message
  if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    submitBtn.setAttribute("disabled", "disabled");
    errorMsg.innerHTML = "Please enter a valid email";
    resetErors();
    return false;
  }
  // regex for password
  // if it's not valid, change the error message
  if (
    !passwordInput.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  ) {
    submitBtn.setAttribute("disabled", "disabled");
    errorMsg.innerHTML =
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
    resetErors();
    return false;
  }
  return true;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // do the default action if all inputs are valid
  if (areInputsGood()) {
    let registerData = new FormData();
    registerData.append("username", usernameInput.value);
    registerData.append("firstName", firstNameInput.value);
    registerData.append("lastName", lastNameInput.value);
    registerData.append("email", emailInput.value);
    registerData.append("password", passwordInput.value);
    // gender and role are select inputs with options
    registerData.append("gender", genderInput.value);
    registerData.append("roles", roleInput.value);
    fetch("/api/register", {
      method: "POST",
      body: registerData,

      // if the response is ok, redirect to the login page
    }).then((res) => {
      if (res.ok) {
        window.location.href = "/login";
      }
    });
  }
});

submitBtn.addEventListener("mouseover", () => {
  areInputsGood();
});
