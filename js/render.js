'use strict';

(function () {
  // Константы
  var NUMBER_OF_WIZARDS = 4;

  // Элементы DOM
  var setupSimilarListElement = document.querySelector('.setup-similar-list');
  var setupSimilarItemElement = document.querySelector('#similar-wizard-template').
                                content.querySelector('.setup-similar-item');

  // Создание персонажа
  var createWizard = function (wizard) {
    var setupWizard = setupSimilarItemElement.cloneNode(true);

    setupWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    setupWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    setupWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return setupWizard;
  };

  // Адаптация ответа сервера под структуру приложения
  var adaptData = function (item) {
    return {
      name: item.name,
      coatColor: item.colorCoat,
      eyesColor: item.colorEyes
    };
  };

  // Создание списка персонажей
  var createWizardsList = function (wizardData) {
    var setupWizardsList = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      setupWizardsList.appendChild(createWizard(adaptData(wizardData[i])));
    }

    setupSimilarListElement.innerHTML = '';
    setupSimilarListElement.appendChild(setupWizardsList);
  };

  // Экспорт
  window.render = {
    createWizardsList: createWizardsList
  };
})();
