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

  var ErrorStyle = {
    POSITION: 'z-index: 100; position: absolute; left: 0; right: 0;',
    GAPS: 'margin: 0 auto; padding: 22px 0;',
    TEXT: 'font-size: 30px; text-align: center;',
    COLOR: 'background-color: red;'
  };

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

  // Адаптация ответа сервера под структуру приложения
  var adaptData = function (item) {
    return {
      name: item.name,
      coatColor: item.colorCoat,
      eyesColor: item.colorEyes
    };
  };

  // Создание персонажа
  var createWizard = function (wizard) {
    var currentWizard = adaptData(wizard);
    var setupWizard = setupSimilarItemElement.cloneNode(true);

    setupWizard.querySelector('.setup-similar-label').textContent = currentWizard.name;
    setupWizard.querySelector('.wizard-coat').style.fill = currentWizard.coatColor;
    setupWizard.querySelector('.wizard-eyes').style.fill = currentWizard.eyesColor;

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
    window.backend.load(onLoadSuccess, onError);
  };

  // Успешная загрузка
  var onLoadSuccess = function (wizardData) {
    setupSimilarListElement.appendChild(createWizardsList(wizardData));

    setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Успешное сохранение
  var onSaveSuccess = function () {
    setupElement.classList.add('hidden');
  };

  // Ошибка при загрузке/сохранении
  var onError = function (errorMessage) {
    var node = document.createElement('div');

    node.style.cssText = ErrorStyle.POSITION + ErrorStyle.GAPS + ErrorStyle.TEXT + ErrorStyle.COLOR;
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Обработчики событий DOM
  userNameInputElement.addEventListener('keydown', window.util.disableEscPress);

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
    window.backend.save(new FormData(setupWizardFormElement), onSaveSuccess, onError);
    evt.preventDefault();
  });

  // Экспорт
  window.setup = {
    renderPopup: renderPopup
  };
})();
