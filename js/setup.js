'use strict';

// Константы
var WIZARD = {
  names: {
    first: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    last: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  },
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};
var NUMBER_OF_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Переменные для DOM
var setupElement = document.querySelector('.setup');
var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
var setupSimilarItemElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var userNameInputElement = setupElement.querySelector('.setup-user-name');

var wizardElement = document.querySelector('.setup-wizard');
var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
var wizardFireballElement = document.querySelector('.setup-fireball-wrap');

var wizardCoatInputElement = setupElement.querySelector('[name = coat-color]');
var wizardEyesInputElement = setupElement.querySelector('[name = eyes-color]');
var wizardFireballInputElement = setupElement.querySelector('[name = fireball-color]');

// Генерация индекса случайного элемента массива
var getRandomIndex = function (array) {
  return array[Math.floor((Math.random() * array.length))];
};

// Генерация объектов для массива данных о персонажах
var getWizardData = function (numberOfWizards) {
  var wizardData = [];

  for (var i = 0; i < numberOfWizards; i++) {
    var fullName = getRandomIndex(WIZARD.names.first) + ' ' + getRandomIndex(WIZARD.names.last);
    var coatColor = getRandomIndex(WIZARD.coatColors);
    var eyesColor = getRandomIndex(WIZARD.eyesColors);

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

// Отрисовка окна сравнения
var renderPopup = function (numberOfWizards) {
  setupSimilarListElement.appendChild(createWizardsList(getWizardData(numberOfWizards)));
  setupElement.querySelector('.setup-similar').classList.remove('hidden');
};

// Открытие окна
var openPopup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Закрытие окна
var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Закрытие окна по ESC при отсутствии фокуса на элементе внутри него
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInputElement) {
    closePopup();
  }
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

// Обработчики событий DOM
setupOpenElement.addEventListener('click', function () {
  openPopup();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoatElement.addEventListener('click', function () {
  changeColor(wizardCoatElement, wizardCoatInputElement, getRandomIndex(WIZARD.coatColors));
});

wizardEyesElement.addEventListener('click', function () {
  changeColor(wizardEyesElement, wizardEyesInputElement, getRandomIndex(WIZARD.eyesColors));
});

wizardFireballElement.addEventListener('click', function () {
  changeColor(wizardFireballElement, wizardFireballInputElement, getRandomIndex(WIZARD.fireballColors));
});

renderPopup(NUMBER_OF_WIZARDS);
