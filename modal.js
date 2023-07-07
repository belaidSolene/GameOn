// Modifies the CSS class of the element with the ID "header" to make the navigation responsive
function editNav() {
  var header = document.getElementById("header");

  header.className === "header" ? header.className += " responsive" : header.className = "header";
}

// Initializes the modal events
modalEvents();

function modalEvents() {
  // Modal Elements
  const modalSection = ".modal-section";
  const signupBtns = document.querySelectorAll(".btn--signup");
  const closeModalBtns = document.querySelectorAll(".close");

  // Adds an event listener to each signup button to launch the modal display
  signupBtns.forEach((btn) => btn.addEventListener("click", () => {
    lauchDiv(modalSection);
    lauchDiv(".content--form-body");
    document.getElementById("firstName").focus();
  }));
  // Adds an event listener to each close button to close the modal
  closeModalBtns.forEach((btn) => btn.addEventListener("click", () => {
    closeDiv(modalSection);
    closeDiv(".content--confirmation");
  }));
}

// Adds the "show" class to the element to display the div
function lauchDiv(div) {
  document.querySelector(div).classList.add("show");
}

// Removes the "show" class from the element to hide the div
function closeDiv(div) {
  document.querySelector(div).classList.remove("show");
}

// Initializes the form events
formEvent();

function formEvent() {
  const form = document.querySelector("#bookingGameEvent");

  // Adds an event listener for the "submit" event of the form
  form.addEventListener('submit', (event) => {

    // Map containing the validation functions for each form field
    const fieldsToValidate = new Map([
      // Key : field name, 
      // Value: an array of validation functions to call for the field
      ['firstName', [isEmpty, isPatternRespected]],
      ['lastName', [isEmpty, isPatternRespected]],
      ['email', [isEmpty, isPatternRespected]],
      ['birthDate', [isEmpty, isOverEighteen]],
      ['numberGameJoin', [isPatternRespected]],
      ['location', [isCheckedRadio]],
      ['checkboxCGU', [isCGUChecked]]
    ]);

    // Map containing the actions to be performed after the form is validated
    const callWindowsFct = new Map([
      // Key: window class, 
      // Value: function to execute on the window
      ['.content--form-body', closeDiv],
      ['.content--confirmation', lauchDiv]
    ]);

    event.preventDefault();

    // Sets the height of the confirmation div to match the form's height
    document.querySelector('.content--confirmation').style.height = form.offsetHeight + 'px';

    // Validates the form by calling the validateForm function
    validateForm(fieldsToValidate, callWindowsFct, form);
  });
}

/*
  Validates the form by performing individual field validation,
  executes the specified actions after successful validation, and resets the form
*/
function validateForm(mapFieldsAndFctsForValidation, mapActionsAfterFormValidated, form) {
  
  if (validationFields(mapFieldsAndFctsForValidation) === 0) {
    
    mapActionsAfterFormValidated.forEach((fct, key) => {
      fct(key);
    })

    form.reset();
  }
}

/*
  Performs validation for each field specified in the mapFieldsAndFctsForValidation,
  displays error messages returned by the validation functions,
  and returns the numberof errors found
*/
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

//////////////////// Validation functions \\\\\\\\\\\\\\\\\\\\\\\\\\
/* 
  Search for errors 
  If an error is found, it returns a specific error message; otherwise, it returns false as the answer to "is there an error?" 
*/

// Determines if the field matches the regex specified in the regexByField map
function isPatternRespected(fieldList) {
  const regexByField = new Map([
    // Key: field ID
    // Value: an array with the first element as regex, and the second element as an error message
    ['firstName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
    ['lastName', [/^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,}$/, "Il faut renseigner 2 caractères minimum"]],
    ['email', [/\b[\w\.-]+@[\w\.-]+\.\w{2,}\b/i, "Email non valide"]],
    ['numberGameJoin', [/^([0-9]{1,})$/, "Veuillez renseigner un nombre positif"]]
  ]);

  const field = getField(fieldList);
  const regexField = regexByField.get(field.id);

  return regexField[0].test(field.value) ? false : regexField[1];
}

// Determines if the date is over 18 but under 126 years
function isOverEighteen(fieldList) {
  const fieldDate = new Date(getField(fieldList).value);
  const overEighteenDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
  const overOneHundredDate = new Date(new Date()).setFullYear(new Date().getFullYear() - 126);

  return fieldDate < overEighteenDate && fieldDate > overOneHundredDate ? false : 'Il faut être majeur pour s\'inscrire';
}

// Checks if at least one radio button is selected
function isCheckedRadio(fieldList) {
  let notChecked = true;

  fieldList.forEach((radio) => {
    if (radio.checked === true) {
      notChecked = false;
    }
  });

  return notChecked ? "Veuillez choisir un tournoi" : false;
}

/* 
  Checks if the field is empty,
  the "required" attribute must be set on the input,
  can be used with checkboxes 
*/
function isEmpty(fieldList) {
  return getField(fieldList).validity.valueMissing ? "ce champ est obligatoire" : false;
}

// Checks if the CGU checkbox is selected
function isCGUChecked(fieldList) {
  return !isEmpty(fieldList) ? false : "Veuillez accepter les CGU";
}

// Returns the first element of the array in the argument
function getField(fieldList) {
  return fieldList[0];
}

////////////////////////////////////////////////////////////////////////////////

// Adds and displays an error message on the specified div
function setDataError(div, message) {
  div.setAttribute('data-error', message);
  div.setAttribute('data-error-visible', true);
}

// Deletes the error message from the specified div
function deleteDataError(div) {
  div.setAttribute('data-error-visible', false);
}
