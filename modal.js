function editNav() {
  var header = document.getElementById("header");
  if (header.className === "header") {
    header.className += " responsive";
  } else {
    header.className = "header";
  }
}

// Modal Elements for Modal Events
const modalSection = document.querySelector(".modal-section");
const signupBtn = document.querySelectorAll(".btn--signup");
const closeModalBtn = document.querySelector(".close-form");
const formBody = document.querySelector(".modal-section__form-body");
const firstName = document.getElementById("firstName");

// Modal Events
// launch modal event
signupBtn.forEach((btn) => btn.addEventListener("click", lauchModal));

// close modal with button 
closeModalBtn.addEventListener("click", closeModal(modalSection));

// launch modal modal
function lauchModal() {
  modalSection.className += " show";
  firstName.focus(); // focus on firstName
}

// close modal
function closeModal(element) {
 element.classList.remove("show");
}


// Form Elements for Validation Form
const formData = document.querySelectorAll(".formData");

const form = document.getElementById("bookingGameEvent");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthDate");
const numberGameJoin = document.getElementById("numberGameJoin");
const checkboxCGU = document.getElementById("checkboxCGU");

// Validation Form
form.addEventListener('submit', (event) => {
  event.preventDefault;
  // close form --> appears thank message --> close thank message and modal
});

const dataError = document.getElementById("magic");

dataError.addEventListener('click', () => {
  for (const div of formData) {
    console.log(div); // affiche toutes les div formData
  }
  // Possible d'ajouter data-error-visible 
  // comment déterminer que c'est sur la bonne div qu'il la modifie ??
  // il faut
  // found la div dont l'enfant "input" à "id === falseElement.id"
  //et ajouter l'attribut data-eror-visible à la div
});

