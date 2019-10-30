'use strict';

(function () {
  // Константы
  var Wizard = {
    COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'],
    EYES_COLORS: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'],
    FIREBALL_COLORS: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848']
  };

  // Элементы DOM
  var wizardCoatElement = document.querySelector('.wizard-coat');
  var wizardEyesElement = document.querySelector('.wizard-eyes');
  var wizardFireballElement = document.querySelector('.setup-fireball-wrap');

  var wizardCoatInputElement = document.querySelector('[name = coat-color]');
  var wizardEyesInputElement = document.querySelector('[name = eyes-color]');
  var wizardFireballInputElement = document.querySelector('[name = fireball-color]');

  // Изменение цвета элемента и его поля ввода
  var changeColor = function (element, inputElement, color) {
    if (element === wizardFireballElement) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    inputElement.value = color;
  };

  // Обработчики событий DOM
  wizardCoatElement.addEventListener('click', function () {
    var newColor = window.util.getRandomIndex(Wizard.COAT_COLORS);
    changeColor(wizardCoatElement, wizardCoatInputElement, newColor);
    window.setup.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = window.util.getRandomIndex(Wizard.EYES_COLORS);
    changeColor(wizardEyesElement, wizardEyesInputElement, newColor);
    window.setup.onEyesChange(newColor);
  });

  wizardFireballElement.addEventListener('click', function () {
    var newColor = window.util.getRandomIndex(Wizard.FIREBALL_COLORS);
    changeColor(wizardFireballElement, wizardFireballInputElement, newColor);
  });
})();
