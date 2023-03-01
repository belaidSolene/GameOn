function editNav() {
  var header = document.getElementById("header");
  if (header.className === "header") {
    header.className += " responsive";
  } else {
    header.className = "header";
  }
}

// DOM Elements
const formSection = document.querySelector(".form-section");
const signupBtn = document.querySelectorAll(".btn-signup");
const formData = document.querySelectorAll(".formData");

// launch modal event
signupBtn.forEach((btn) => btn.addEventListener("click", launchForm));

// launch modal form
function launchForm() {
  formSection.style.display = "block";
}


