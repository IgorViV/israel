'use strict';

var formWantToGo = document.querySelector('.form--want-to-go');
var formContacts = document.querySelector('.form--contacts');
var buttonOrderCall = document.querySelector('.page-header__btn');
var pageModalOverlay = document.querySelector('.modal-overlay');
var modalCall = pageModalOverlay.querySelector('.modal--order-call');
var btnModalCallSubmit = modalCall.querySelector('.modal__btn--submit');
var modalAccepted = pageModalOverlay.querySelector('.modal--accepted');
var btnModalAccepted = modalAccepted.querySelector('.modal__btn--accepted');
var btnModalCallClose = pageModalOverlay.querySelector('.modal__btn-close--call');
var btnModalAcceptedClose = pageModalOverlay.querySelector('.modal__btn-close--accepted');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

if (formWantToGo) {
  formWantToGo.addEventListener('submit', function () {
    onModalOkOpen();
  });
}

if (formContacts) {
  formWantToGo.addEventListener('submit', function () {
    onModalOkOpen();
  });
}

if (buttonOrderCall) {
  buttonOrderCall.addEventListener('click', function (evt) {
    evt.preventDefault();
    onModalCallOpen();
  });
}

if (btnModalCallClose) {
  btnModalCallClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    onModalCallClose();
  });
}

if (btnModalCallSubmit) {
  btnModalCallSubmit.addEventListener('click', function () {
    onModalCallClose();
    onModalOkOpen();
  });

  btnModalCallSubmit.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, onModalCallClose);
    isEnterEvent(evt, onModalOkOpen);
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

windows.addEventListener('keydown', function (evt) {
  isEscEvent(evt, onModalCallClose);
  isEscEvent(evt, onModalOkClose);
});

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
