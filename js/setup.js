'use strict';

(function () {
  // Константы
  var NUMBER_OF_WIZARDS = 4;

  // Элементы DOM
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

  var setupWizardFormElement = setupElement.querySelector('.setup-wizard-form');

  // Создание персонажа
  var createWizard = function (wizard) {
    var setupWizard = setupSimilarItemElement.cloneNode(true);

    setupWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    setupWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    setupWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return setupWizard;
  };

  // Создание списка персонажей
  var createWizardsList = function (wizardData) {
    var setupWizardsList = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
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

  // Отрисовка окна сравнения
  var renderPopup = function () {
    window.backend.load(function (wizardData) {
      setupSimilarListElement.appendChild(createWizardsList(wizardData));
    });

    setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Обработчики событий DOM
  userNameInputElement.addEventListener('keydown', window.util.disableEscEvent);

  wizardCoatElement.addEventListener('click', function () {
    changeColor(
        wizardCoatElement,
        wizardCoatInputElement,
        window.util.getRandomIndex(Wizard.COAT_COLORS)
    );
  });

  wizardEyesElement.addEventListener('click', function () {
    changeColor(
        wizardEyesElement,
        wizardEyesInputElement,
        window.util.getRandomIndex(Wizard.EYES_COLORS)
    );
  });

  wizardFireballElement.addEventListener('click', function () {
    changeColor(
        wizardFireballElement,
        wizardFireballInputElement,
        window.util.getRandomIndex(Wizard.FIREBALL_COLORS)
    );
  });

  setupWizardFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupWizardFormElement), function (response) {
      setupElement.classList.add('hidden');
    });
    evt.preventDefault();
  });

  // Экспорт
  window.setup = {
    renderPopup: renderPopup
  };
})();
