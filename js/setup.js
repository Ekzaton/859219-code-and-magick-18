'use strict';

// Константы
var WIZARD = {
  name: {
    first: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    last: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  },
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};
var NUMBER_OF_WIZARDS = 4;

// Переменные для DOM
var setupPopupElement = document.querySelector('.setup');
var setupSimilarListElement = setupPopupElement.querySelector('.setup-similar-list');
var setupSimilarItemElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Генерация индекса случайного элемента массива (array - массив)
var getRandomIndex = function (array) {
  return array[Math.floor((Math.random() * array.length))];
};

// Генерация объектов для массива данных о персонажах (number - количество персонажей)
var getWizardData = function (number) {
  var wizardData = [];

  for (var i = 0; i < number; i++) {
    var fullName = getRandomIndex(WIZARD.name.first) + ' ' + getRandomIndex(WIZARD.name.last);
    var coatColor = getRandomIndex(WIZARD.coatColor);
    var eyesColor = getRandomIndex(WIZARD.eyesColor);

    var newWizard = {
      name: fullName,
      coatColor: coatColor,
      eyesColor: eyesColor
    };

    wizardData.push(newWizard);
  }

  return wizardData;
};

// Создание персонажа (wizard - персонаж)
var createWizard = function (wizard) {
  var setupWizard = setupSimilarItemElement.cloneNode(true);

  setupWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  setupWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  setupWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return setupWizard;
};

// Создание списка персонажей (wizardData - данные о персонаже)
var createWizardsList = function (wizardData) {
  var setupWizardsList = document.createDocumentFragment();

  for (var i = 0; i < wizardData.length; i++) {
    setupWizardsList.appendChild(createWizard(wizardData[i]));
  }

  setupSimilarListElement.appendChild(setupWizardsList);
};

// Отрисовка окна сравнения (items - количество похожих персонажей)
var renderPopup = function (items) {
  setupPopupElement.classList.remove('hidden');
  createWizardsList(getWizardData(items));
  setupPopupElement.querySelector('.setup-similar').classList.remove('hidden');
};

renderPopup(NUMBER_OF_WIZARDS);
