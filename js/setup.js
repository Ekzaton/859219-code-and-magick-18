'use strict';

var setupPopup = document.querySelector('.setup');
setupPopup.classList.remove('hidden');

var setupSimilarList = setupPopup.querySelector('.setup-similar-list');
var setupSimilarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARDS = {
  name: {
    firstName: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    lastName: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  },
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};
var NUMBER_OF_WIZARDS = 4;

// Генерация случайного элемента массива
var getRandomItem = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерация массива данных для персонажей
var getData = function (number) {
  var wizardData = [];

  for (var i = 0; i < number; i++) {
    if (getRandomItem(0, 1) === 0) {
      var fullName = WIZARDS.name.firstName[getRandomItem(0, WIZARDS.name.firstName.length - 1)] + ' ' + WIZARDS.name.lastName[getRandomItem(0, WIZARDS.name.lastName.length - 1)];
    } else {
      fullName = WIZARDS.name.lastName[getRandomItem(0, WIZARDS.name.lastName.length - 1)] + ' ' + WIZARDS.name.firstName[getRandomItem(0, WIZARDS.name.firstName.length - 1)];
    }

    wizardData[i] = {
      name: fullName,
      coatColor: WIZARDS.coatColor[getRandomItem(0, WIZARDS.coatColor.length - 1)],
      eyesColor: WIZARDS.eyesColor[getRandomItem(0, WIZARDS.eyesColor.length - 1)]
    };
  }

  return wizardData;
};

// Создание песонажа
var createWizard = function (wizard) {
  var setupWizard = setupSimilarWizardTemplate.cloneNode(true);

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

  setupSimilarList.appendChild(setupWizardsList);
  setupPopup.querySelector('.setup-similar').classList.remove('hidden');
};

createWizardsList(getData(NUMBER_OF_WIZARDS));
