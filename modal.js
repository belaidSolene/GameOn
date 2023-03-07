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
closeModalBtn.addEventListener("click", closeModal);

// launch modal modal
function lauchModal() {
  modalSection.className += " show";
  firstName.focus(); // focus on firstName
}

// close modal
function closeModal() {
  modalSection.classList.remove("show");
}


// Form Element for Validation Form
const form = document.querySelector("#bookingGameEvent");
const allFormData = document.querySelectorAll(".formData");

// Validation Form
form.addEventListener('submit', (event) => {
  event.preventDefault;
  // close form --> appears thank message --> close thank message and modal
});


class FieldForm {
  // constructor(indiceParent, idInput, valueInput) {
  constructor(indiceParent, field) {
    this.indiceParent = indiceParent;
    this.field = field;
    // this.idInput = idInput;
    // this.valueInput = valueInput;
  }
}

//Experience to make form validation
const dataError = document.getElementById("magic"); // bouton/texte pour lancer les fonctions
dataError.addEventListener('click', () => {

  const tabFieldsForm = getFieldsForm();

  for (const fieldForm of tabFieldsForm) {
    validateInput(fieldForm);
  }
});

function getFieldsForm() {
  // objectif : Récupérer dans un tableau des objets ChampForm pour chaque input du formulaire bookingGameEvent \\
  let tabInput = [];

  for (const i in allFormData) {
    const childrenFormData = allFormData[i].childNodes;

    if (childrenFormData != null) {
      for (const child of childrenFormData) {

        if (child.nodeName === 'INPUT') { //vérifié s'ils ont l'attribut required également ??
          //console.log('une réussite : ', child);
          tabInput.push(new FieldForm(i, child));
        }
      }
    }
  }
  // console.log(tabInput);
  return tabInput;
}


function validateInput(fieldForm) {
  // objectif : Déterminer quel input passé en argument pour effectuer par la suite la validation nécessaire
  let nameInput = fieldForm.field.name;

  switch (nameInput) {
    case 'firstName':
      console.log(nameInput, ' : test min 2 lettres');
      break;

    case 'lastName':
      console.log(nameInput, ' : test min 2 lettres');
      break;

    case 'email':
      console.log(nameInput, ' : hfdgeziyu@hjfgeuy.fhr');
      break;

    case 'birthDate':
      console.log(nameInput, ' : a quel point t\'es vieux ? min age ??');
      break;

    case 'numberGameJoin':
      console.log(nameInput, ' : important de connaître votre expérience');
      break;

    case 'numberGameJoin':
      console.log(nameInput, ' : important de connaître votre expérience');
      break;

    case 'location':
      console.log(nameInput, ' : faut bidouillé avec celui-ci ils sont six');
      break;

    case 'checkboxCGU':
      console.log(nameInput, ' : LE TRUC QUI DOIT A TOUT PRIX ETRE VALIDE');
      setDataErrorVisibleOnFormData(fieldForm.indiceParent);
      break;

    default:
      //inutile si vérification de 'required' au préalable
      break;
  }
}

function setDataErrorVisibleOnFormData(i) {
  // objectif : ajouter l'attribut data-error-visible à la div formData passé en argument
  allFormData[i].setAttribute('data-error-visible', true);
}