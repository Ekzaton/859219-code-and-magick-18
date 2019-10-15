'use strict';

(function () {
  // Константы
  var WIZARD = {
    names: {
      first: [
        'Иван',
        'Хуан Себастьян',
        'Мария',
        'Кристоф',
        'Виктор',
        'Юлия',
        'Люпита',
        'Вашингтон'],
      last: [
        'да Марья',
        'Верон',
        'Мирабелла',
        'Вальц',
        'Онопко',
        'Топольницкая',
        'Нионго',
        'Ирвинг']
    },
    coatColors: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'],
    eyesColors: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'],
    fireballColors: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848']
  };
  var NUMBER_OF_WIZARDS = 4;

  // Переменные для DOM
  var setupElement = document.querySelector('.setup');
  var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
  var setupSimilarItemElement = document.querySelector('#similar-wizard-template').
                                content.querySelector('.setup-similar-item');

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var wizardFireballElement = document.querySelector('.setup-fireball-wrap');

  var userNameInputElement = setupElement.querySelector('.setup-user-name');

  var wizardCoatInputElement = setupElement.querySelector('[name = coat-color]');
  var wizardEyesInputElement = setupElement.querySelector('[name = eyes-color]');
  var wizardFireballInputElement = setupElement.querySelector('[name = fireball-color]');

  // Генерация объектов для массива данных о персонажах
  var getWizardData = function (numberOfWizards) {
    var wizardData = [];

    for (var i = 0; i < numberOfWizards; i++) {
      var firstName = window.util.getRandomIndex(WIZARD.names.first);
      var lastName = window.util.getRandomIndex(WIZARD.names.last);
      var fullName = firstName + ' ' + lastName;
      var coatColor = window.util.getRandomIndex(WIZARD.coatColors);
      var eyesColor = window.util.getRandomIndex(WIZARD.eyesColors);

      var newWizard = {
        name: fullName,
        coatColor: coatColor,
        eyesColor: eyesColor
      };

      wizardData.push(newWizard);
    }

    return wizardData;
  };

  // Создание персонажа
  var createWizard = function (wizard) {
    var setupWizard = setupSimilarItemElement.cloneNode(true);

    setupWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    setupWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    setupWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return setupWizard;
  };

  // Создание списка персонажей
  var createWizardsList = function (wizardData) {
    var setupWizardsList = document.createDocumentFragment();

    for (var i = 0; i < wizardData.length; i++) {
      setupWizardsList.appendChild(createWizard(wizardData[i]));
    }

    return setupWizardsList;
  };

  // Изменение цвета элемента и его поля ввода
  var changeColor = function (element, inputElement, color) {
    if (element === wizardFireballElement) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    inputElement.value = color;
  };

  window.setup = {
    // Отрисовка окна сравнения
    renderPopup: function () {
      setupSimilarListElement.appendChild(
        createWizardsList(
          getWizardData(NUMBER_OF_WIZARDS)
        )
      );
      setupElement.querySelector('.setup-similar').classList.remove('hidden');
    }
  };

  // Обработчики событий DOM
  userNameInputElement.addEventListener('keydown', window.util.disableEscEvent);

  wizardCoatElement.addEventListener('click', function () {
    changeColor(
      wizardCoatElement,
      wizardCoatInputElement,
      window.util.getRandomIndex(WIZARD.coatColors)
    );
  });

  wizardEyesElement.addEventListener('click', function () {
    changeColor(
      wizardEyesElement,
      wizardEyesInputElement,
      window.util.getRandomIndex(WIZARD.eyesColors)
    );
  });

  wizardFireballElement.addEventListener('click', function () {
    changeColor(
      wizardFireballElement,
      wizardFireballInputElement,
      window.util.getRandomIndex(WIZARD.fireballColors)
    );
  });
})();
