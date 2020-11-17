'use strict';

var accordion = document.querySelector('.accordion');

accordion.addEventListener('click', function (evt) {
  evt.preventDefault();
  var elemDt = evt.target.closest('dt');
  if (!elemDt) {
    return;
  }
  if (!accordion.contains(elemDt)) {
    return;
  }
  elemDt.classList.toggle('accordion__item-header--active');
});
