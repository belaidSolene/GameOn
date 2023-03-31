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
  closeModalBtns.forEach((btn) => btn.addEventListener("click", () => {
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

    const fieldsToValidate = new Map([
      // key : name field, 
      // value : an array of all functions to call to validate field
      ['firstName', [isEmpty, isPatternRespected]],
      ['lastName', [isEmpty, isPatternRespected]],
      ['email', [isEmpty, isPatternRespected]],
      ['birthDate', [isEmpty, isOverEighteen]],
      ['numberGameJoin', [isPatternRespected]],
      ['location', [isCheckedRadio]],
      ['checkboxCGU', [isCheckedCheckbox]]
    ]);

    const callWindowsFct = new Map([
      // key : class of window, 
      // value : function to execute on the window 
      ['.content--form-body', closeDiv],
      ['.content--confirmation', lauchDiv]
    ]);

    event.preventDefault();

    // set the height of the confirmation div as the same as the form
    document.querySelector('.content--confirmation').style.height = form.offsetHeight + 'px';

    validateForm(fieldsToValidate, callWindowsFct, form);
  });
}

/* purpose : to validate the form, needs a map with the functions to call by inputs' name, 
a map with the functions to call after the validation succeed, 
and the form that has to be reset */
function validateForm(mapFieldsAndFctsForValidation, mapActionsAfterFormValidated, form) {
  
  if (validationFields(mapFieldsAndFctsForValidation) === 0) {
    
    mapActionsAfterFormValidated.forEach((fct, key) => {
      fct(key);
    })

    form.reset();
  }
}

/* purpose : to call all the functions for each field pointed out in mapFielsAndFctsForValidation,
             to display the error messages send by the validation's functions
return the number of error found */
function validationFields(mapFieldsAndFctsForValidation) {
  let errors = 0;

  mapFieldsAndFctsForValidation.forEach((fcts, key) => {
    const fields = document.getElementsByName(key); // return an array
    const msgErreur = [];

    fcts.forEach((fct) => {
      const response = fct(fields);

      if (response !== false) {
        msgErreur.push(response);
      }
    });


    if (msgErreur.length >= 1) {
      setDataError(getField(fields).parentNode, msgErreur[0]);
      errors++;
    } else {
      deleteDataError(getField(fields).parentNode);
    }
  });

  return (errors);
}

//////////////////// validation's functions \\\\\\\\\\\\\\\\\\\\\\\\\\
/* Search for errors 
if one is find they return a specific error message else they return false as in "did not find any error" */

// purpose : to check if the checkbox CGU is selected
function isCheckedCheckbox(fieldList) {
  return !getField(fieldList).checked ? "Veuillez accepter les CGU" : false;
}

// purpose : to determine if the field respect the regex points out in the map regexByField
function isPatternRespected(fieldList) {
  const regexByField = new Map([
    // key : id of the field
    // value: an array with first --> regex, second --> error message
    ['firstName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
    ['lastName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
    ['email', [/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/i, "Email non valide"]],
    ['numberGameJoin', [/^([0-9]{1,})$/, "Veuillez renseigner un nombre positif"]]
  ]);

  const field = getField(fieldList);
  const regexField = regexByField.get(field.id);

  return regexField[0].test(field.value) ? false : regexField[1];
}

// purpose : to determine if the date is under 18 but over 126 years
function isOverEighteen(fieldList) {
  const fieldDate = new Date(getField(fieldList).value);
  const overEighteenDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
  const overOneHundredDate = new Date(new Date()).setFullYear(new Date().getFullYear() - 126);

  return fieldDate < overEighteenDate && fieldDate > overOneHundredDate ? false : 'Il faut être majeur pour s\'inscrire';
}

// purpose : to check is at least one radio bouton is selected
function isCheckedRadio(fieldList) {
  let notChecked = true;

  fieldList.forEach((radio) => {
    if (radio.checked === true) {
      notChecked = false;
    }
  });

  return notChecked ? "Veuillez choisir un tournoi" : false;
}

/* purpose : to check if the field is empty, 
the propriety "required" has to be on the imput, 
can be call with checkboxes */
function isEmpty(fieldList) {
  return getField(fieldList).validity.valueMissing ? "ce champ est obligatoire" : false;
}

// purpose : return first element of the  array in argument
function getField(fieldList) {
  return field = fieldList[0];
}

////////////////////////////////////////////////////////////////////////////////

// purpose : to add and to display error message on the div passes in arguments
function setDataError(div, message) {
  div.setAttribute('data-error', message);
  div.setAttribute('data-error-visible', true);
}

// purpose : to delete error message on the div passes in arguments
function deleteDataError(div) {
  div.setAttribute('data-error-visible', false);
}
