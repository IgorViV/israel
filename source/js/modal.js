'use strict';

var buttonOrderCall = document.querySelector('.page-header__btn');
var pageModalOverlay = document.querySelector('.modal-overlay');
var modalCall = pageModalOverlay.querySelector('.modal--order-call');
var modalAccepted = pageModalOverlay.querySelector('.modal--accepted');
var modalCallSubmit = modalCall.querySelector('.modal__btn--submit');
var modalAcceptedBtn = modalAccepted.querySelector('.modal__btn--accepted');
var modalCallBtnClose = pageModalOverlay.querySelector('.modal__btn-close--call');
var modalAcceptedBtnClose = pageModalOverlay.querySelector('.modal__btn-close--accepted');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

function onModalCallOpen() {
  modalCall.classList.remove('hidden');
  pageModalOverlay.classList.remove('hidden');
}

function onModalCallClose() {
  modalCall.classList.add('hidden');
}

function onModalAcceptedClose() {
  modalAccepted.classList.add('hidden');
  pageModalOverlay.classList.add('hidden');
}

function onAllModalClose() {
  modalCall.classList.add('hidden');
  modalAccepted.classList.add('hidden');
  pageModalOverlay.classList.add('hidden');
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

buttonOrderCall.addEventListener('click', function () {
  onModalCallOpen();
});

modalCallBtnClose.addEventListener('click', function () {
  onModalCallClose();
  pageModalOverlay.classList.add('hidden');
});

modalAcceptedBtnClose.addEventListener('click', function () {
  onModalAcceptedClose();
});

modalCallSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();

  onModalCallClose();

  // открыть модальное окно Заявка принята
  modalAccepted.classList.remove('hidden');
});

modalCallSubmit.addEventListener('keydown', function (evt) {

  isEnterEvent(evt, onModalCallClose);

  // открыть модальное окно Заявка принята
  modalAccepted.classList.remove('hidden');
});

modalAcceptedBtn.addEventListener('click', function () {
  onModalAcceptedClose();
});

modalAcceptedBtn.addEventListener('keydown', function (evt) {
  isEnterEvent(evt, onModalAcceptedClose);
});

document.addEventListener('keydown', function (evt) {

  isEscEvent(evt, onAllModalClose);
});
