function editNav() {
  var header = document.getElementById("header");

  header.className === "header" ? header.className += " responsive" : header.className = "header";
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
  closeModalBtns.forEach((btn) => btn.addEventListener("click", () =>  {
    closeDiv(modalSection);
    closeDiv(".content--confirmation");
  }));
}

// add class with "display: block" on div 
function lauchDiv(div) {
  document.querySelector(div).className += " show";
}

// remove class with "display: block" on div
function closeDiv(div) {
  document.querySelector(div).classList.remove("show");
}

formEvent();

function formEvent() {
  const form = document.querySelector("#bookingGameEvent");

  // lauch validation form bookingGameEvent
  form.addEventListener('submit', (event) => {
    const callValidationFunctions = new Map([
      ['firstName', [isEmpty, isPatternRespected]],
      ['lastName', [isEmpty, isPatternRespected]],
      ['email', [isEmpty, isPatternRespected]],
      ['numberGameJoin', [isPatternRespected]],
      ['birthDate', [isEmpty, isOverEighteen]],
      ['location', [isCheckedRadio]],
      ['checkboxCGU', [isCheckedCheckbox]]
    ]);

    const callWindowFunction = new Map([
      ['.content--form-body', closeDiv],
      ['.content--confirmation', lauchDiv]
    ]);
  
    
    event.preventDefault();

   setHeightConfirmation('.content--confirmation');

    validate(callValidationFunctions, callWindowFunction, form);
  });
}

// objectif : valider un formulaire
function validate(callValidationFunctions, callWindowFunction, form) {
  validationFields(callValidationFunctions);

  if (validationForm()) {
    callWindowFunction.forEach((fct, key) => {
      fct(key);
    })

    form.reset();
  } 
}

function setHeightConfirmation(window) {
  const formHeight = document.getElementById("bookingGameEvent").offsetHeight;
  const formPadding = parseInt(getComputedStyle(document.getElementById("bookingGameEvent")).paddingTop) + parseInt(getComputedStyle(document.getElementById("bookingGameEvent")).paddingBottom);
  const formBorder = parseInt(getComputedStyle(document.getElementById("bookingGameEvent")).borderTopWidth) + parseInt(getComputedStyle(document.getElementById("bookingGameEvent")).borderBottomWidth);
  const totalHeight = formHeight + formPadding + formBorder;
  document.querySelector(window).style.height = totalHeight + 'px';
}


// objectif : appel les fonctions de validation indiquées dans callValidationFunctions en fonction de la clé
function validationFields(callValidationFunctions) {
  callValidationFunctions.forEach((fcts, key) => {
    const fields = document.getElementsByName(key); // renvoie tableau
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

// objectif : check que la case à cocher est coché
function isCheckedCheckbox(fieldList) {
  return !getField(fieldList).checked ? "veuillez accepter les CGU" : false;
}

// objectif : check si le format est respecté
function isPatternRespected(fieldList) {
  const regex = new Map([
    ['firstName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
    ['lastName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
    ['email', [/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/i, "Email non valide"]],
    ['numberGameJoin', [/^([0-9]{1,})$/, "Veuillez renseigner un nombre positif"]]
  ]);

  const field = getField(fieldList);
  const regexField = regex.get(field.id);

  return regexField[0].test(field.value) ? false : regexField[1];
}

function isOverEighteen (fieldList) {
  const fieldDate = new Date(getField(fieldList).value);
  const overEighteenDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
  const overOneHundredDate = new Date(new Date()).setFullYear(new Date().getFullYear() - 126);

  return fieldDate < overEighteenDate && fieldDate > overOneHundredDate ? false : 'Il faut être majeur pour s\'inscrire' ;
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

// objectif : check si le champs n'est pas vide
function isEmpty(fieldList) {
  return getField(fieldList).value == "" ? "ce champ est obligatoire" : false;
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