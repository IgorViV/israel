'use strict';

var buttonOrderCall = document.querySelector('.page-header__btn');
var formWantToGo = document.forms.want;
var formContacts = document.forms.contacts;
var pageModalOverlay = document.querySelector('.modal-overlay');
var modalCall = pageModalOverlay.querySelector('.modal--order-call');
var formModalCall = document.forms.modalcall;
var nameModalCall = formModalCall.elements.name;
var phoneModalCall = formModalCall.elements.phone;
var modalAccepted = pageModalOverlay.querySelector('.modal--accepted');
var btnModalAccepted = modalAccepted.querySelector('.modal__btn--accepted');
var btnModalCallClose = pageModalOverlay.querySelector('.modal__btn-close--call');
var btnModalAcceptedClose = pageModalOverlay.querySelector('.modal__btn-close--accepted');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

if (formWantToGo) {
  formWantToGo.elements.phone.onfocus = function () {
    getValueLocalStorage(formWantToGo);
  };
  formWantToGo.addEventListener('submit', function (evt) {
    if (!formWantToGo.elements.phone.validity.valid) {
      evt.preventDefault();
      formWantToGo.elements.phone.style.borderColor = '#ff0000';
    }
    setValueLocalStorage(formWantToGo);
    onModalOkOpen();
  });

  onValidityElementForm(formWantToGo);
}

if (formContacts) {
  formContacts.elements.name.onfocus = function () {
    getValueLocalStorage(formContacts);
  };
  formContacts.addEventListener('submit', function (evt) {
    if (!formContacts.elements.name.validity.valid) {
      evt.preventDefault();
      formContacts.elements.name.style.borderColor = '#ff0000';
    }
    if (!formContacts.elements.phone.validity.valid) {
      evt.preventDefault();
      formContacts.elements.phone.style.borderColor = '#ff0000';
    }
    setValueLocalStorage(formContacts);
    onModalOkOpen();
  });

  onValidityElementForm(formContacts);
}

if (formModalCall) {
  formModalCall.addEventListener('submit', function (evt) {
    if (!nameModalCall.validity.valid || !phoneModalCall.validity.valid) {
      evt.preventDefault();
    }

    setValueLocalStorage(formModalCall);
    onModalOkOpen();
  });

  onValidityElementForm(formModalCall);
}

if (buttonOrderCall) {
  buttonOrderCall.addEventListener('click', function (evt) {
    evt.preventDefault();
    onModalCallOpen();
    getValueLocalStorage(formModalCall);
  });
}

if (btnModalCallClose) {
  btnModalCallClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    onModalCallClose();
  });
}

if (btnModalAccepted) {
  btnModalAccepted.addEventListener('click', function (evt) {
    evt.preventDefault();
    onModalOkClose();
  });

  btnModalAccepted.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, onModalOkClose);
  });
}

if (btnModalAcceptedClose) {
  btnModalAcceptedClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    onModalOkClose();
  });
}

document.addEventListener('keydown', function (evt) {
  isEscEvent(evt, onModalCallClose);
  isEscEvent(evt, onModalOkClose);
});

function onValidityElementForm(currentForm) {
  if (currentForm.elements.name) {
    currentForm.elements.name.addEventListener('input', function () {
      if (!currentForm.elements.name.validity.valid) {
        currentForm.elements.name.style.borderColor = '#ff0000';
      } else {
        currentForm.elements.name.style.borderColor = '#9A9A9A';
      }
    });
  }
  if (currentForm.elements.phone) {
    currentForm.elements.phone.addEventListener('input', function () {
      if (!currentForm.elements.phone.validity.valid) {
        currentForm.elements.phone.style.borderColor = '#ff0000';
      } else {
        currentForm.elements.phone.style.borderColor = '#9A9A9A';
      }
    });
  }
}

function setValueLocalStorage(currentForm) {
  if (isStorageSupport) {
    if (currentForm.elements.name) {
      localStorage.setItem('name', currentForm.elements.name.value);
    }
    if (currentForm.elements.phone) {
      localStorage.setItem('phone', currentForm.elements.phone.value);
    }
  }
}

function getValueLocalStorage(currentForm) {
  if (storage) {
    if (currentForm.elements.name) {
      currentForm.elements.name.value = storage;
      if (!currentForm.elements.phone.validity.valid) {
        currentForm.elements.phone.style.borderColor = '#ff0000';
      } else {
        currentForm.elements.phone.style.borderColor = '#9A9A9A';
      }
    }
    if (currentForm.elements.phone) {
      currentForm.elements.phone.focus();
      currentForm.elements.phone.value = localStorage.getItem('phone');
      if (!currentForm.elements.phone.validity.valid) {
        currentForm.elements.phone.style.borderColor = '#ff0000';
      } else {
        currentForm.elements.phone.style.borderColor = '#9A9A9A';
      }
    }
  } else {
    if (currentForm.elements.name) {
      currentForm.elements.name.focus();
    }
  }
}

function onModalCallOpen() {
  if (pageModalOverlay.classList.contains('modal-overlay--hidden')) {
    pageModalOverlay.classList.remove('modal-overlay--hidden');
  }
  if (modalCall.classList.contains('modal--hidden')) {
    modalCall.classList.remove('modal--hidden');
  }
}

function onModalCallClose() {
  if (!pageModalOverlay.classList.contains('modal-overlay--hidden')) {
    pageModalOverlay.classList.add('modal-overlay--hidden');
  }
  if (!modalCall.classList.contains('modal--hidden')) {
    modalCall.classList.add('modal--hidden');
  }
}

function onModalOkOpen() {
  if (pageModalOverlay.classList.contains('modal-overlay--hidden')) {
    pageModalOverlay.classList.remove('modal-overlay--hidden');
  }
  if (modalAccepted.classList.contains('modal--hidden')) {
    modalAccepted.classList.remove('modal--hidden');
  }
}

function onModalOkClose() {
  if (!pageModalOverlay.classList.contains('modal-overlay--hidden')) {
    pageModalOverlay.classList.add('modal-overlay--hidden');
  }
  if (!modalAccepted.classList.contains('modal--hidden')) {
    modalAccepted.classList.add('modal--hidden');
  }
}

function isEscEvent(evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
}

function isEnterEvent(evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
}

// ==========================================================================

// Еще реализовать:

// - закрытие модального окна по кнопке "Х",  по нажатию клавиши Esc, по клику на overlay.
// - при открытие модального окна фокус в поле "Имя"
// - значения полей "Имя", "Телефон" должны храниться в localStorage
// - при отправке формы, попап "Заказать звонок" меняется на попап "Заявка принята"

// ==========================================================================

// var email = document.getElementById("mail");

// email.addEventListener("input", function (event) {
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("I expect an e-mail, darling!");
//   } else {
//     email.setCustomValidity("");
//   }
// });
