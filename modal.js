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

// Modal Events
// launch modal event
signupBtn.forEach((btn) => btn.addEventListener("click", lauchModal));

// close modal with button 
closeModalBtn.addEventListener("click", closeModal);

// launch modal modal
function lauchModal() {
  modalSection.className += " show";
}

// close modal
function closeModal() {
  modalSection.classList.remove("show");
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
  const allFormData = document.querySelectorAll(".formData");

  const tabFieldsForm = getFieldsForm(allFormData);

  for (const fieldForm of tabFieldsForm) {
    validateInput(fieldForm, allFormData);
  }
});

  // objectif : Récupérer dans un tableau chaque input du formulaire bookingGameEvent \\
function getFieldsForm(allFormData) {
    
  let tabInput = [];
  let tabRadio = [];

  for (const div of allFormData) {
    const childrenFormData = div.childNodes;

    if (childrenFormData != null) {
      for (const child of childrenFormData) {

        if (child.nodeName === 'INPUT') { //faire deux tableaux ? un pour les inputs classiques et l'autre pour radio ?
          //console.log('une réussite : ', child);
          (child.type === 'radio' ? tabRadio : tabInput).push(child);
        }
      }
    }
  }
   console.log('TabInput : ', tabInput);
   console.log('Tab Radio : ', tabRadio);
  return tabInput;
}


  // objectif : Déterminer quel input passé en argument pour effectuer par la suite la validation nécessaire
function validateInput(field) {
  let divParent = field.parentNode;
  let nameInput = field.name;
  let validity = field.validity;


  switch (nameInput) {
    case 'firstName':
      console.log(nameInput, ' CheckValidity : ', field.checkValidity());
      if (!field.checkValidity()) {
        let msgError;
        let empty = isEmpty(validity);

        if (empty[0]) {
          console.log(nameInput, ' avec isEmpty (on veut true) : ', empty[0]);
          msgError = empty[1];
        } else {
          let short = isShort(validity);

            if (short[0]) {
              console.log(nameInput, ' avec isShort (on veut true) : ', short[0]);
              msgError = short[1];
            }
        }
        setDataError(divParent, msgError);
      } else {
        deleteDataError(divParent);
      }

      break;

    case 'email':
      if (!field.checkValidity()) {
        let msgError;
        let empty = isEmpty(validity);

        if (empty[0]) {
          console.log(nameInput, ' avec isEmpty (on veut true) : ', empty[0]);
          msgError = empty[1];
        } else {
          let email = isEmail(validity);

          if (email[0]) {
            console.log(nameInput, ' avec isEmail : ', email[0]);
            msgError = email[1];
          }
        }
        setDataError(divParent, msgError);
      } 
      console.log(nameInput, ' avec typeMismatch : ', field.validity.typeMismatch);
      break;

  }
}

/*
const validateProcess = new Map ([
  ['name', [FirstFunction, SecondFunction]],
  ['email', [FirstFunction] ],
  ['birthDate', [FistFunction, ThirdFunction] ]
]);


const FunctionNames = Object.freeze({ 
  FirstFunction: "firstFunction", 
  SecondFunction: "secondFunction" 
});

...

var customObject = {
  [FunctionNames.FirstFunction]: function(param){...},
  [FunctionNames.SecondFunction]: function(param){...}
};

...

customObject[FunctionNames.FirstFunction](param);
*/


function isValid(field) {
  if (!field.checkValidity()) {
    let errorFind = false;
    let tabValidity = field.validity;
    while (!errorFind) {
      // isEmpty est appelé par défaut puis 
      // parcours tab pour savoir quelles fonctions appelées 
      // errorFind récupère la valeur à l'indice 0 du tab retourné
    }
  }
}

function isEmpty(validity) {
  return validity.valueMissing ? [true, "ce champ est obligatoire"] : [false];
}

function isShort(validity) {
  return validity.tooShort ? [true, "il faut renseigner 2 caractères minimum"] : [false];
}

function isEmail(validity) {
  return validity.typeMismatch ? [true, "ce n'est pas un email"] : [false];
}

function isTypeRespected(validity) {
  return validity.badInput ? [true, "Le format n'est pas respecté"] : [false];
}

function isRadioChecked(tabInput) {

}


  // objectif : ajouter l'attribut data-error-visible à la div formData passé en argument
function setDataError(div, message) {
  div.setAttribute('data-error', message);
  div.setAttribute('data-error-visible', true);
}

function deleteDataError(div) {
    div.setAttribute('data-error-visible', false);
}