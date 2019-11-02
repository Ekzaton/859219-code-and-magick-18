'use strict';

(function () {
  // Константы
  var ErrorStyle = {
    POSITION: 'z-index: 100; position: absolute; left: 0; right: 0;',
    GAPS: 'margin: 0 auto; padding: 22px 0;',
    TEXT: 'font-size: 30px; text-align: center;',
    COLOR: 'background-color: red;'
  };

  // Глобальные переменные
  var wizards = [];
  var coatColor;
  var eyesColor;

  // Элементы DOM
  var setupElement = document.querySelector('.setup');
  var userNameInputElement = document.querySelector('.setup-user-name');
  var setupWizardFormElement = document.querySelector('.setup-wizard-form');

  // Получение степени похожести персонажа
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  // Обновление списка похожих персонажей
  var updateWizards = function () {
    window.render.createWizardsList(
        wizards.slice().sort(function (left, right) {
          var rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
          return 0 ? rankDiff : (getRank(right) - getRank(left));
        })
    );
  };

  // Изменение цвета мантии
  var onCoatChange = window.util.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  // Изменение цвета глаз
  var onEyesChange = window.util.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  // Успешная загрузка
  var onLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
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

  // Отрисовка окна сравнения
  var renderPopup = function () {
    window.backend.load(onLoadSuccess, onError);
  };

  // Обработчики событий DOM
  userNameInputElement.addEventListener('keydown', window.util.disableEscPress);

  setupWizardFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupWizardFormElement), onSaveSuccess, onError);
    evt.preventDefault();
  });

  // Экспорт
  window.setup = {
    onCoatChange: onCoatChange,
    onEyesChange: onEyesChange,
    renderPopup: renderPopup
  };
})();
