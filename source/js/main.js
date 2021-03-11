'use strict';

// modal:
(function myModal() {
  var html = document.documentElement;
  var buttonOrderCall = document.querySelector('.page-header__btn');
  var modalOrderCall = document.querySelector('#modal--order-call');
  var btnCloseCall = modalOrderCall.querySelector('.modal__btn-close--call');
  var btnCallSubmit = modalOrderCall.querySelector('.modal__btn--submit');
  var modalShadow = document.querySelector('.modal__shadow');
  var modalAccepted = document.querySelector('#modal--accepted');
  var btnCloseAccepted = modalAccepted.querySelector('.modal__btn-close--accepted');
  var btnOkAccepted = modalAccepted.querySelector('.modal__btn--accepted');
  var formWantToGo = document.querySelector('.form--want-to-go');
  var formContacts = document.querySelector('.form--contacts');
  var formModalCall = document.querySelector('.form--modal');
  var scrollPosition = window.pageYOffset;
  var marginSize = window.innerWidth - html.clientWidth;
  var ESC_KEYCODE = 27;
  var isValidationValid = false;
  var isStorageSupport = true;
  var storage = {
    name: '',
    phone: ''
  };

  try {
    storage.name = localStorage.getItem('name');
    storage.phone = localStorage.getItem('phone');
  } catch (err) {
    isStorageSupport = false;
  }

  getInputLocalStorage(formWantToGo);
  getInputLocalStorage(formContacts);

  function getInputLocalStorage(nameForm) {
    if (isStorageSupport) {
      var inputElements = nameForm.querySelectorAll('input');

      for (var i = 0; i < inputElements.length; i++) {
        var currentInput = inputElements[i];
        if (currentInput.getAttribute('name') === 'name') {
          if (storage.name) {
            currentInput.value = storage.name;
          }
        }
        if (currentInput.getAttribute('name') === 'phone') {
          if (storage.phone) {
            currentInput.value = storage.phone;
          }
        }
      }
    }
  }

  buttonOrderCall.addEventListener('click', function () {
    scrollPosition = window.pageYOffset;
    marginSize = window.innerWidth - html.clientWidth;
    onModalCallOpen();
    if (!storage.name) {
      formModalCall.elements.name.focus();
    } else {
      getInputLocalStorage(formModalCall);
    }
  });

  btnCloseCall.addEventListener('click', function () {
    onModalCallClose();
  });

  document.addEventListener('keydown', function (evt) {
    isEscEvent(evt, onModalCallClose);
    isEscEvent(evt, onModalOkClose);
  });

  document.addEventListener('click', function (evt) {
    var wrap = evt.target.classList.contains('modal__wrap');

    if (!wrap) {
      return;
    }

    evt.preventDefault();
    onModalCallClose();
    onModalOkClose();
  });

  btnCallSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();

    onValidationInput(formModalCall);
    if (isValidationValid) {
      onModalCallClose();
      onModalOkOpen();
    }

    isValidationValid = false;
  });

  btnCloseAccepted.addEventListener('click', function () {
    onModalOkClose();
  });

  btnOkAccepted.addEventListener('click', function () {
    onModalOkClose();
  });

  function onModalCallOpen() {
    onHtmlFixed();

    if (marginSize) {
      html.style.marginRight = marginSize + 'px';
    }

    if (modalOrderCall) {
      if (!modalOrderCall.classList.contains('modal--active')) {
        modalOrderCall.classList.add('modal--active');
      }
    }

    if (modalShadow) {
      if (!modalShadow.classList.contains('modal__shadow--show')) {
        modalShadow.classList.add('modal__shadow--show');
      }
    }
  }

  function onModalCallClose() {
    if (modalOrderCall) {
      if (modalOrderCall.classList.contains('modal--active')) {
        modalOrderCall.classList.remove('modal--active');
      }
    }

    if (modalShadow) {
      if (modalShadow.classList.contains('modal__shadow--show')) {
        modalShadow.classList.remove('modal__shadow--show');
      }
    }

    onHtmlUnfixed();
    html.style.marginRight = '';
  }

  function onModalOkOpen() {
    onHtmlFixed();

    if (marginSize) {
      html.style.marginRight = marginSize + 'px';
    }

    if (modalAccepted) {
      if (!modalAccepted.classList.contains('modal--active')) {
        modalAccepted.classList.add('modal--active');
      }
    }

    if (modalShadow) {
      if (!modalShadow.classList.contains('modal__shadow--show')) {
        modalShadow.classList.add('modal__shadow--show');
      }
    }
  }

  function onModalOkClose() {

    if (modalAccepted) {
      if (modalAccepted.classList.contains('modal--active')) {
        modalAccepted.classList.remove('modal--active');
      }
    }

    if (modalShadow) {
      if (modalShadow.classList.contains('modal__shadow--show')) {
        modalShadow.classList.remove('modal__shadow--show');
      }
    }

    onHtmlUnfixed();
    html.style.marginRight = '';
  }

  function onHtmlFixed() {
    html.style.top = -scrollPosition + 'px';
    html.classList.add('modal-is-open');
  }

  function onHtmlUnfixed() {
    html.classList.remove('modal-is-open');
    window.scrollTo(0, scrollPosition);
    html.style.top = '';
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  maskPhone('.js-user-phone');
  submitForm(formWantToGo);
  submitForm(formContacts);

  function maskPhone(selector) {
    var elems = document.querySelectorAll(selector);
    var masked = '+7 (___) ___ __ __';

    function mask(event) {
      var keyCode = event.keyCode;
      var template = masked;
      var def = template.replace(/\D/g, '');
      var val = this.value.replace(/\D/g, '');
      var i = 0;
      var newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      var reg = template.substr(0, this.value.length).replace(/_+/g, function (a) {
        return '\\d{1,' + a.length + '}';
      }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === 'blur' && this.value.length < 5) {
        this.value = '';
      }

    }

    for (var j = 0; j < elems.length; j++) {
      elems[j].addEventListener('input', mask);
      elems[j].addEventListener('focus', mask);
      elems[j].addEventListener('blur', mask);
    }
  }

  function submitForm(elemForm) {
    if (!elemForm) {
      return;
    }

    var buttonSubmit = elemForm.querySelector('.js-button-submit');

    if (!buttonSubmit) {
      return;
    }

    buttonSubmit.addEventListener('click', function (evt) {
      evt.preventDefault();

      onValidationInput(elemForm);
      if (isValidationValid) {
        onModalOkOpen();
      }

      isValidationValid = false;
    });
  }

  function onValidationInput(currentForm) {
    var inputs = currentForm.querySelectorAll('input');

    if (!inputs.length) {
      return;
    }

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var attrInput = input.getAttribute('type');

      if (attrInput !== 'checkbox') {

        if (input.checkValidity() === false) {
          input.classList.add('js-error');

          createErrorMessage(input);
          addInputListener(input);
          addInputFocusListener(input);
        }
        if (input.checkValidity() === true) {
          if (input.classList.contains('js-error')) {
            input.classList.remove('js-error');
          }
          if (isStorageSupport) {
            if (input.getAttribute('name') === 'name') {
              localStorage.setItem('name', input.value);
            }
            if (input.getAttribute('name') === 'phone') {
              localStorage.setItem('phone', input.value);
            }
          }
        }
        isValidationValid = input.checkValidity();
      }
    }
  }

  function createErrorMessage(elem) {

    if (elem.nextElementSibling) {
      return;
    }

    var errorTemplate = document.querySelector('#error-message');
    if (!errorTemplate) {
      return;
    }

    var errorMessage = errorTemplate.content.querySelector('.form__error-message').cloneNode(true);
    elem.after(errorMessage);
  }

  function addInputListener(input) {
    input.addEventListener('input', function () {
      if (input.classList.contains('js-error')) {
        input.classList.remove('js-error');
      }

      removeErrorMessage(input);
    });
  }

  function addInputFocusListener(input) {
    input.addEventListener('focus', function () {
      if (input.classList.contains('js-error')) {
        input.classList.remove('js-error');
      }

      removeErrorMessage(input);
    });
  }

  function removeErrorMessage(elem) {

    if (!elem.nextElementSibling) {
      return;
    }

    elem.nextElementSibling.remove();
  }

}());

// life slider:
(function sliderLife() {
  var blockLife = document.querySelector('.life');
  var lifeSlider = blockLife.querySelector('.life__slider');
  var slides = lifeSlider.querySelectorAll('.life__slide');
  var sliderControls = blockLife.querySelector('.life__slider-controls');
  var sliderBtn = sliderControls.querySelectorAll('.life__btn');
  var clickPosition = {
    xStart: 0,
    xEnd: 0,
    xShift: 0
  };
  var currentPosition = {
    currentSlide: 0,
    currentXOffset: 0
  };
  var MOBILE_BREAKPOINT = 767;

  addBtnActive(sliderBtn[currentPosition.currentSlide]);
  transformSlider(currentPosition.currentSlide);

  lifeSlider.addEventListener('touchstart', function (evt) {
    clickPosition.xStart = getMouseXPosition(evt);

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
  });

  lifeSlider.addEventListener('mousedown', function (evt) {
    clickPosition.xStart = getMouseXPosition(evt);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  if (sliderControls) {
    sliderControls.addEventListener('click', function (evt) {
      var btn = evt.target.closest('button');

      if (!btn) {
        return;
      }

      if (!sliderControls.contains(btn)) {
        return;
      }

      if (currentPosition.currentSlide !== getCurrentIndexBtn(btn)) {
        addBtnActive(btn);
        removeBtnActive(sliderBtn[currentPosition.currentSlide]);
        currentPosition.currentSlide = getCurrentIndexBtn(btn);
        transformSlider(currentPosition.currentSlide);
      }
    });
  }

  window.addEventListener('resize', function () {
    if (getElemWidth(blockLife) > MOBILE_BREAKPOINT) {
      removeBtnActive(sliderBtn[currentPosition.currentSlide]);
      currentPosition.currentSlide = 0;
      addBtnActive(sliderBtn[currentPosition.currentSlide]);
    }
    transformSlider(currentPosition.currentSlide);
  });

  function getElemWidth(elem) {
    return parseFloat(getComputedStyle(elem).width);
  }

  function getMouseXPosition(evt) {
    return evt.clientX || evt.touches[0].clientX;
  }

  function onSlideMove() {
    if (getElemWidth(blockLife) <= MOBILE_BREAKPOINT) {
      var transValue;

      if (currentPosition.currentSlide === 0 && clickPosition.xShift > 0 || currentPosition.currentSlide === (slides.length - 1) && clickPosition.xShift < 0) {
        transValue = 'transform: translateX(' + (currentPosition.currentXOffset + clickPosition.xShift / 2) + 'px)';
      } else {
        transValue = 'transform: translateX(' + (currentPosition.currentXOffset + clickPosition.xShift) + 'px)';
      }

      lifeSlider.setAttribute('style', transValue);
    }
  }

  function onMouseMove(moveEvt) {
    clickPosition.xEnd = getMouseXPosition(moveEvt);
    clickPosition.xShift = clickPosition.xEnd - clickPosition.xStart;
    onSlideMove();
  }

  function onMouseUp() {

    if (getElemWidth(blockLife) <= MOBILE_BREAKPOINT) {
      currentPosition.currentXOffset = currentPosition.currentXOffset + clickPosition.xShift;

      if (clickPosition.xShift < 0 && currentPosition.currentSlide < slides.length - 1) {
        removeBtnActive(sliderBtn[currentPosition.currentSlide]);
        currentPosition.currentSlide++;
        transformSlider(currentPosition.currentSlide);
        addBtnActive(sliderBtn[currentPosition.currentSlide]);
      } else {
        transformSlider(currentPosition.currentSlide);
      }

      if (clickPosition.xShift > 0 && currentPosition.currentSlide !== 0) {
        removeBtnActive(sliderBtn[currentPosition.currentSlide]);
        currentPosition.currentSlide--;
        transformSlider(currentPosition.currentSlide);
        addBtnActive(sliderBtn[currentPosition.currentSlide]);
      } else {
        transformSlider(currentPosition.currentSlide);
      }

    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchmove', onMouseMove);
    document.removeEventListener('touchend', onMouseUp);
  }

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
    return +targetBtn.getAttribute('data-number-of');
  }

  function transformSlider(currentIndex) {
    var transValue = 'transform: translateX(-' + currentIndex * getElemWidth(slides[currentPosition.currentSlide]) + 'px)';
    lifeSlider.setAttribute('style', transValue);
    currentPosition.currentXOffset = (-1) * currentIndex * getElemWidth(slides[currentIndex]);
  }
}());

// accordion:
(function myAccordion() {
  var accordion = document.querySelector('.accordion');
  var ENTER_KEYCODE = 13;

  if (accordion) {
    accordion.addEventListener('click', function (evt) {
      evt.preventDefault();
      onTabChangState(evt);
    });

    accordion.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        var arrDt = accordion.querySelectorAll('dt');
        for (var i = 0; i < arrDt.length; i++) {
          var currentDt = arrDt[i];

          if (currentDt === document.activeElement) {
            currentDt.classList.toggle('accordion__item-header--active');
          }
        }
      }
    });
  }

  function onTabChangState(evt) {
    var elemDt = evt.target.closest('dt');

    if (!elemDt) {
      return;
    }

    if (!accordion.contains(elemDt)) {
      return;
    }
    elemDt.classList.toggle('accordion__item-header--active');
  }
}());


// feedback slider:
(function sliderFeedback() {
  var feedbackSlider = document.querySelector('.feedback__slider');
  var feedbackSliderList = feedbackSlider.querySelector('.feedback__slider-list');
  var feedbackSliderItems = feedbackSlider.querySelectorAll('.feedback__slider-item');
  var feedbackSliderControl = feedbackSlider.querySelector('.feedback__slider-controls');
  var feedbackBtnPrev = feedbackSlider.querySelector('.feedback__btn--prev');
  var feedbackBtnNext = feedbackSlider.querySelector('.feedback__btn--next');
  var feedbackSlideNumber = feedbackSlider.querySelector('.feedback__slider-number');
  var feedbackSlideSum = feedbackSlider.querySelector('.feedback__slider-sum');
  var positionLeftItem = 0;
  var transformValue = 0;
  var position = {
    getMin: 0,
    getMax: feedbackSliderItems.length - 1,
    xStart: 0,
    xEnd: 0,
    xShift: 0
  };

  setSliderNumber(1);
  setSumSlides(feedbackSliderItems.length);

  // SWIPE ======================================================

  feedbackSliderList.addEventListener('touchstart', function (evt) {
    position.xStart = getXPosition(evt);

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
  });

  feedbackSliderList.addEventListener('mousedown', function (evt) {
    position.xStart = getXPosition(evt);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function getXPosition(evt) {
    return evt.clientX || evt.touches[0].clientX;
  }

  function onMouseMove(evt) {
    position.xEnd = getXPosition(evt);
    position.xShift = position.xEnd - position.xStart;
    onFeedbackItemMove();
  }

  function getDirectionMove() {
    var directionMove;
    if (position.xShift < 0 && positionLeftItem < feedbackSliderItems.length - 1) {
      directionMove = 'right';
    }

    if (position.xShift > 0 && positionLeftItem !== 0) {
      directionMove = 'left';
    }

    return directionMove;
  }

  function onMouseUp() {
    transformFeedbackItem(getDirectionMove());
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchmove', onMouseMove);
    document.removeEventListener('touchend', onMouseUp);
  }

  function onFeedbackItemMove() {
    var transMoveValue = transformValue;
    if (positionLeftItem === 0 && position.xShift > 0 || positionLeftItem === (feedbackSliderItems.length - 1) && position.xShift < 0) {
      transMoveValue = transMoveValue + (position.xShift / parseFloat(getComputedStyle(feedbackSliderItems[positionLeftItem]).width) / 2) * 100;
    } else {
      transMoveValue = transMoveValue + position.xShift / parseFloat(getComputedStyle(feedbackSliderItems[positionLeftItem]).width) * 100;
    }

    feedbackSliderList.style.transform = 'translateX(' + transMoveValue + '%)';
  }

  // END SWIPE ================================================

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
      transformFeedbackItem(direction);
    });
  }

  window.addEventListener('resize', function () {
    // TODO: переделать чтобы оставался тотже слайд при resize
    setSliderNumber(1);
    feedbackSliderList.style.transform = 'translateX(0%)';
    if (!feedbackBtnPrev.disabled) {
      feedbackBtnPrev.setAttribute('disabled', 'true');
    }
  });

  function transformFeedbackItem(direction) {
    var sliderWidth = parseFloat(getComputedStyle(feedbackSliderList).width);
    var sliderItemWidth = parseFloat(getComputedStyle(feedbackSliderItems[0]).width);
    var stepTransform = sliderItemWidth / sliderWidth * 100;

    if (direction === 'right') {
      if (positionLeftItem >= position.getMax) {
        return;
      }
      if (feedbackBtnPrev.disabled) {
        feedbackBtnPrev.removeAttribute('disabled');
      }
      if (!feedbackBtnPrev.disabled && positionLeftItem + 1 >= position.getMax) {
        feedbackBtnNext.setAttribute('disabled', 'true');
      }

      positionLeftItem++;
      transformValue -= stepTransform;
      setSliderNumber(positionLeftItem + 1);
    }
    if (direction === 'left') {
      if (positionLeftItem <= position.getMin) {
        return;
      }
      if (feedbackBtnNext.disabled) {
        feedbackBtnNext.removeAttribute('disabled');
      }
      if (!feedbackBtnNext.disabled && positionLeftItem - 1 <= position.getMin) {
        feedbackBtnPrev.setAttribute('disabled', 'true');
      }

      positionLeftItem--;
      transformValue += stepTransform;
      setSliderNumber(positionLeftItem + 1);
    }

    feedbackSliderList.style.transform = 'translateX(' + transformValue + '%)';
  }

  function setSliderNumber(indexSlide) {
    feedbackSlideNumber.textContent = indexSlide;
  }

  function setSumSlides(sumSlides) {
    feedbackSlideSum.textContent = sumSlides;
  }
}());

// polyfills
(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) {
          return node;
        } else {
          node = node.parentElement;
        }
      }
      return null;
    };
  }
})();

(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();
