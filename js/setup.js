'use strict';

// Константы
var WIZARD = {
  names: {
    first: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    last: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  },
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};
var NUMBER_OF_WIZARDS = 4;

// Переменные для DOM
var setupPopupElement = document.querySelector('.setup');
var setupSimilarListElement = setupPopupElement.querySelector('.setup-similar-list');
var setupSimilarItemElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupPopupElement.querySelector('.setup-close');

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
  setupPopupElement.classList.remove('hidden');
  setupSimilarListElement.appendChild(createWizardsList(getWizardData(numberOfWizards)));
  setupPopupElement.querySelector('.setup-similar').classList.remove('hidden');
};

renderPopup(NUMBER_OF_WIZARDS);

setupOpenElement.addEventListener('click', function () {
  setupPopupElement.classList.remove('hidden');
});

setupCloseElement.addEventListener('click', function () {
  setupPopupElement.classList.add('hidden');
});
