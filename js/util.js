'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Действие при нажатии ESC
  var pressEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  // Запрет действия при нажатии ESC
  var disableEscEvent = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  // Действие при нажатии ENTER
  var pressEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // Генерация индекса случайного элемента массива
  var getRandomIndex = function (array) {
    return array[Math.floor((Math.random() * array.length))];
  };

  // Экспорт
  window.util = {
    pressEscEvent: pressEscEvent,
    disableEscEvent: disableEscEvent,
    pressEnterEvent: pressEnterEvent,
    getRandomIndex: getRandomIndex
  };
})();
