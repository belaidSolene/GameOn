function editNav() {
  var header = document.getElementById("header");
  if (header.className === "header") {
    header.className += " responsive";
  } else {
    header.className = "header";
  }
}

modalEvents();



function modalEvents() {
  // Modal Elements
  const modalSection = document.querySelector(".modal-section");
  const signupBtn = document.querySelectorAll(".btn--signup");
  const closeModalBtn = document.querySelector(".close-form");

  // launch modal event
  signupBtn.forEach((btn) => btn.addEventListener("click", lauchModal));

  // close modal with button 
  closeModalBtn.addEventListener("click", closeModal);

  // launch modal
  function lauchModal() {
    modalSection.className += " show";
  }

  // close modal
  function closeModal() {
    modalSection.classList.remove("show");
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////
// Form Element for Validation Form
const form = document.querySelector("#bookingGameEvent");


// Validation Form
form.addEventListener('submit', (event) => {
  event.preventDefault;
  // close form --> appears thank message --> close thank message and modal
});
////////////////////////////////////////////////////////////////////////////////////////////////////

//Experience to make form validation
const dataError = document.getElementById("magic"); // bouton/texte pour lancer les fonctions

dataError.addEventListener('click', () => {
  validationFields();
});

function validationFields() {
  const validateProcess = new Map([
    ['firstName', [isEmpty, isPatternRespected]], //pas vide, 2 caract
    ['lastName', [isEmpty, isPatternRespected]],
    ['email', [isEmpty, isPatternRespected]], //valide
    ['numberGameJoin', [isPatternRespected]], //not empty, chiffre
    ['location', [isCheckedRadio]], // un bouton sélectionné
    ['checkboxCGU', [isCheckedCheckbox]] //obligatoire
  ]);

  validateProcess.forEach((fcts, key) => {
    const fields = document.getElementsByName(key);
    const msgErreur = [];

    fcts.forEach((fct) => {
      const reponse = fct(fields);

      if(reponse != false) {
        msgErreur.push(reponse);
      }
    });

    msgErreur.length >= 1 ? setDataError(getField(fields).parentNode, msgErreur[0]) :  deleteDataError(getField(fields).parentNode);
  });
}

function isCheckedRadio(btnsRadios) {
  let notChecked = true;

  btnsRadios.forEach((radio) => {
    if (radio.checked == true) {
      notChecked = false;
    }
  });

  return notChecked ? "Veuillez choisir un tournoi" : false;
}

function isCheckedCheckbox(fieldList) {
  return !getField(fieldList).checked ? "veuillez accepter les CGU" : false;
}

function isEmpty(fieldList) {
  return getField(fieldList).validity.valueMissing ? "ce champ est obligatoire" : false;
}

function isPatternRespected(fieldList) {
  const regex = new Map([
    ['firstName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "il faut renseigner 2 caractères minimum"]],
    ['lastName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "il faut renseigner 2 caractères minimum"]],
    ['email', [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i, "email non valide"]],
    ['numberGameJoin', [/^([0-9]{1,})$/, "obligatoire"]]
  ]);

  const field = getField(fieldList);
  const value = regex.get(field.id);

  return value[0].test(field.value) ? false : value[1];
}

function getField(fieldList) {
  return field = fieldList[0];
}

// objectif : ajouter l'attribut data-error-visible à la div formData passé en argument
function setDataError(div, message) {
  div.setAttribute('data-error', message);
  div.setAttribute('data-error-visible', true);
}

function deleteDataError(div) {
  div.setAttribute('data-error-visible', false);
}