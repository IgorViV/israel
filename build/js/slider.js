'use strict';

var blockLife = document.querySelector('.life');
var lifeSlider = blockLife.querySelector('.life__slider');
var sliderItem = lifeSlider.querySelectorAll('.life__slider-item');
var sliderControls = blockLife.querySelector('.life__slider-controls');
var sliderBtn = sliderControls.querySelectorAll('.life__btn');
var currentNumberSlide = 0;

transformSlider(currentNumberSlide);

addBtnActive(sliderBtn[currentNumberSlide]);

transformSlider(currentNumberSlide);

sliderControls.onclick = function(evt) {
  evt.preventDefault();

  var btn = evt.target.closest('button'); 

  if (!btn) return;

  if (!sliderControls.contains(btn)) return; 

  addBtnActive(btn);
  removeBtnActive(sliderBtn[currentNumberSlide]);

  currentNumberSlide = getCurrentIndexBtn(btn);

  transformSlider(currentNumberSlide);

};

window.addEventListener('resize', function(){
 
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
  var transValue = "transform: translateX(" + currentIndex * (-20) + "%)";
  lifeSlider.setAttribute('style', transValue);
}