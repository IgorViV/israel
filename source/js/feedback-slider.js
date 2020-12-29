// 'use strict';

// var feedbackSlider = document.querySelector('.feedback__slider');
// var feedbackSliderList = feedbackSlider.querySelector('.feedback__slider-list');
// var feedbackSliderItems = feedbackSlider.querySelectorAll('.feedback__slider-item');
// var feedbackSliderControl = feedbackSlider.querySelector('.feedback__slider-controls');
// var feedbackBtnPrev = feedbackSlider.querySelector('.feedback__btn--prev');
// var feedbackBtnNext = feedbackSlider.querySelector('.feedback__btn--next');
// var feedbackSlideNumber = feedbackSlider.querySelector('.feedback__slider-number');
// var feedbackSlideSum = feedbackSlider.querySelector('.feedback__slider-sum');
// var sliderWidth = parseFloat(getComputedStyle(feedbackSliderList).width);
// var sliderItemWidth = parseFloat(getComputedStyle(feedbackSliderItems[0]).width);
// var positionLeftItem = 0;
// var transformValue = 0;
// var stepTransform = sliderItemWidth / sliderWidth * 100;
// var position = {
//   getMin: 0,
//   getMax: feedbackSliderItems.length - 1
// };

// setSliderNumber(1);
// setSumSlides(feedbackSliderItems.length);

// feedbackSliderControl.addEventListener('click', function (evt) {
//   evt.preventDefault();
//   var btn = evt.target.closest('button');
//   if (!btn) {
//     return;
//   }
//   if (!feedbackSliderControl.contains(btn)) {
//     return;
//   }

//   var direction = btn.classList.contains('feedback__btn--next') ? 'right' : 'left';

//   transformFeedbackItem(direction);
// });

// window.addEventListener('resize', function () {
//   setSliderNumber(1);
//   feedbackSliderList.style.transform = 'translateX(0%)';
//   if (feedbackBtnPrev.classList.contains('feedback__btn--active')) {
//     feedbackBtnPrev.classList.remove('feedback__btn--active');
//   }
// });

// function transformFeedbackItem(direction) {
//   if (direction === 'right') {
//     if (positionLeftItem >= position.getMax) {
//       return;
//     }
//     if (!feedbackBtnPrev.classList.contains('feedback__btn--active')) {
//       feedbackBtnPrev.classList.add('feedback__btn--active');
//     }
//     if (feedbackBtnNext.classList.contains('feedback__btn--active') && positionLeftItem + 1 >= position.getMax) {
//       feedbackBtnNext.classList.remove('feedback__btn--active');
//     }

//     positionLeftItem++;
//     transformValue -= stepTransform;
//     setSliderNumber(positionLeftItem + 1);
//   }
//   if (direction === 'left') {
//     if (positionLeftItem <= position.getMin) {
//       return;
//     }
//     if (!feedbackBtnNext.classList.contains('feedback__btn--active')) {
//       feedbackBtnNext.classList.add('feedback__btn--active');
//     }
//     if (feedbackBtnPrev.classList.contains('feedback__btn--active') && positionLeftItem - 1 <= position.getMin) {
//       feedbackBtnPrev.classList.remove('feedback__btn--active');
//     }
//     positionLeftItem--;
//     transformValue += stepTransform;
//     setSliderNumber(positionLeftItem + 1);
//   }

//   feedbackSliderList.style.transform = 'translateX(' + transformValue + '%)';
// }

// function setSliderNumber(indexSlide) {
//   feedbackSlideNumber.textContent = indexSlide;
// }

// function setSumSlides(sumSlides) {
//   feedbackSlideSum.textContent = sumSlides;
// }
