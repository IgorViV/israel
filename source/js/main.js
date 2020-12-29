'use strict';

// modal:
(function () {
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
})();

// life slider:
(function () {
  var blockLife = document.querySelector('.life');
  var lifeSlider = blockLife.querySelector('.life__slider');
  var sliderControls = blockLife.querySelector('.life__slider-controls');
  var sliderBtn = sliderControls.querySelectorAll('.life__btn');
  var currentNumberSlide = 0;

  transformSlider(currentNumberSlide);

  addBtnActive(sliderBtn[currentNumberSlide]);

  transformSlider(currentNumberSlide);

  if (sliderControls) {
    sliderControls.onclick = function (evt) {
      evt.preventDefault();
      var btn = evt.target.closest('button');
      if (!btn) {
        return;
      }
      if (!sliderControls.contains(btn)) {
        return;
      }
      addBtnActive(btn);
      removeBtnActive(sliderBtn[currentNumberSlide]);

      currentNumberSlide = getCurrentIndexBtn(btn);

      transformSlider(currentNumberSlide);
    };
  }

  window.addEventListener('resize', function () {
    if (document.documentElement.clientWidth >= 767) {
      var numberSlide = 0;
      transformSlider(numberSlide);

      addBtnActive(sliderBtn[numberSlide]);

      if (numberSlide !== currentNumberSlide) {
        removeBtnActive(sliderBtn[currentNumberSlide]);
        currentNumberSlide = 0;
      }
    }

  });

  function addBtnActive(targetBtn) {
    if (!targetBtn.classList.contains('life__btn--active')) {
      targetBtn.classList.add('life__btn--active');
    }
  }

  function removeBtnActive(prevBtn) {
    if (prevBtn.classList.contains('life__btn--active')) {
      prevBtn.classList.remove('life__btn--active');
    }
  }

  function getCurrentIndexBtn(targetBtn) {
    return targetBtn.getAttribute('data-number-of');
  }

  function transformSlider(currentIndex) {
    var transValue = 'transform: translateX(' + currentIndex * (-20) + '%)';
    lifeSlider.setAttribute('style', transValue);
  }
})();

// accordion:
(function () {
  var accordion = document.querySelector('.accordion');

  if (accordion) {
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
  }
})();

// feedback slider:
(function () {
  var feedbackSlider = document.querySelector('.feedback__slider');
  var feedbackSliderItems = feedbackSlider.querySelectorAll('.feedback__slider-item');
  var feedbackSliderControl = feedbackSlider.querySelector('.feedback__slider-controls');
  var feedbackBtnPrev = feedbackSlider.querySelector('.feedback__btn--prev');
  var feedbackBtnNext = feedbackSlider.querySelector('.feedback__btn--next');
  var feedbackSlideNumber = feedbackSlider.querySelector('.feedback__slider-number');
  var feedbackSlideSum = feedbackSlider.querySelector('.feedback__slider-sum');
  var currentSlide = 0;
  var position = {
    getMin: 0,
    getMax: feedbackSliderItems.length - 1
  };

  feedbackSliderItems.forEach(function (item) {
    if (item.classList.contains('feedback__slider-item--active')) {
      item.classList.remove('feedback__slider-item--active');
    }
  });

  feedbackSliderItems[0].classList.add('feedback__slider-item--active');
  setSliderNumber(1);
  setSumSlides(feedbackSliderItems.length);
  feedbackBtnPrev.setAttribute('disabled', 'true');

  if (feedbackSliderControl) {
    feedbackSliderControl.addEventListener('click', function (evt) {
      evt.preventDefault();
      var btn = evt.target.closest('button');
      if (!btn) {
        return;
      }
      if (!feedbackSliderControl.contains(btn)) {
        return;
      }

      var direction = btn.classList.contains('feedback__btn--next') ? 'right' : 'left';

      showFeedbackItem(direction);
    });
  }

  function showFeedbackItem(direction) {
    if (direction === 'right') {
      if (currentSlide >= position.getMax) {
        return;
      }
      if (feedbackBtnPrev.disabled) {
        feedbackBtnPrev.removeAttribute('disabled');
      }
      if (!feedbackBtnPrev.disabled && currentSlide + 1 >= position.getMax) {
        feedbackBtnNext.setAttribute('disabled', 'true');
      }
      feedbackSliderItems[currentSlide].classList.remove('feedback__slider-item--active');
      currentSlide++;
      feedbackSliderItems[currentSlide].classList.add('feedback__slider-item--active');
      setSliderNumber(currentSlide + 1);
    }
    if (direction === 'left') {
      if (currentSlide <= position.getMin) {
        return;
      }
      if (feedbackBtnNext.disabled) {
        feedbackBtnNext.removeAttribute('disabled');
      }
      if (!feedbackBtnNext.disabled && currentSlide - 1 <= position.getMin) {
        feedbackBtnPrev.setAttribute('disabled', 'true');
      }
      feedbackSliderItems[currentSlide].classList.remove('feedback__slider-item--active');
      currentSlide--;
      feedbackSliderItems[currentSlide].classList.add('feedback__slider-item--active');
      setSliderNumber(currentSlide + 1);
    }
  }

  function setSliderNumber(indexSlide) {
    feedbackSlideNumber.textContent = indexSlide;
  }

  function setSumSlides(sumSlides) {
    feedbackSlideSum.textContent = sumSlides;
  }
})();
