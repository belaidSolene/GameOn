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
  const modalSection = ".modal-section";
  const signupBtns = document.querySelectorAll(".btn--signup");
  const closeModalBtns = document.querySelectorAll(".close");

  // launch modal event
  signupBtns.forEach((btn) => btn.addEventListener("click", () => {
    lauchDiv(modalSection);
    lauchDiv(".content--form-body");
    document.getElementById("firstName").focus();
  }));

  // close modal with cross 
  closeModalBtns.forEach((btn) => btn.addEventListener("click", () => closeDiv(modalSection)));
}

// add class with "display: block" on div 
function lauchDiv(div) {
  document.querySelector(div).className += " show";
}

// remove class with "display: block" on div
function closeDiv(div) {
  document.querySelector(div).classList.remove("show");
}


/////////////////////////////////////////////////////////////////////////////////////////////

formEvent();

function formEvent() {
  const form = document.querySelector("#bookingGameEvent");

  // Validate Form
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();
  });
}

// objectif : valider form et afficher message de confirmation
function validate() {
  validationFields();

  if (validationForm()) {
    closeDiv(".content--form-body");
    lauchDiv(".content--confirmation");
  }
}

// objectif : valider tous les champs requis et afficher message d'erreur si nécessaire
function validationFields() {
  const validateProcess = new Map([
    ['firstName', [isEmpty, isPatternRespected]],
    ['lastName', [isEmpty, isPatternRespected]],
    ['email', [isEmpty, isPatternRespected]],
    ['numberGameJoin', [isPatternRespected]],
    ['location', [isCheckedRadio]],
    ['checkboxCGU', [isCheckedCheckbox]]
  ]);

  validateProcess.forEach((fcts, key) => {
    const fields = document.getElementsByName(key); // tableau d'élément qui répond à la condition
    const msgErreur = [];

    fcts.forEach((fct) => {
      const reponse = fct(fields);

      if (reponse != false) {
        msgErreur.push(reponse);
      }
    });

    msgErreur.length >= 1 ? setDataError(getField(fields).parentNode, msgErreur[0]) : deleteDataError(getField(fields).parentNode);
  });
}


// objectif : check qu'au moins un bouton radio est sélectionné
function isCheckedRadio(fieldList) {
  let notChecked = true;

  fieldList.forEach((radio) => {
    if (radio.checked == true) {
      notChecked = false;
    }
  });

  return notChecked ? "Veuillez choisir un tournoi" : false;
}

// objectif : check que la case à cocher est coché
function isCheckedCheckbox(fieldList) {
  return !getField(fieldList).checked ? "veuillez accepter les CGU" : false;
}

// objectif : check si le champs n'est pas vide
function isEmpty(fieldList) {
  return getField(fieldList).value == "" ? "ce champ est obligatoire" : false;
}

// objectif : check si le format est respecté
function isPatternRespected(fieldList) {
  const regex = new Map([
    ['firstName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "il faut renseigner 2 caractères minimum"]],
    ['lastName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "il faut renseigner 2 caractères minimum"]],
    ['email', [/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/i, "email non valide"]],
    ['numberGameJoin', [/^([0-9]{1,})$/, "obligatoire"]]
  ]);

  const field = getField(fieldList);
  const regexField = regex.get(field.id);

  return regexField[0].test(field.value) ? false : regexField[1];
}

// objectif : renvoie le premier élément du tableau passé en argument
function getField(fieldList) {
  return field = fieldList[0];
}

////////////////////////////////////////////////////////////////////////////////

// objectif : ajouter et afficher message d'erreur
function setDataError(div, message) {
  div.setAttribute('data-error', message);
  div.setAttribute('data-error-visible', true);
}

// objectif : supprimer message d'erreur
function deleteDataError(div) {
  div.setAttribute('data-error-visible', false);
}

// objectif : vérifier qu'il y a aucun message d'erreur pour valider formulaire
function validationForm() {
  const formData = document.querySelectorAll(".formData");
  let isValid = true;

  formData.forEach((div) => {
    if (div.getAttribute('data-error-visible') === 'true') {
      isValid = false;
    }
  });

  return isValid;
} 