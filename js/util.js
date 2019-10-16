'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    // Действие при нажатии ESC
    pressEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    // Запрет действия при нажатии ESC
    disableEscEvent: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.stopPropagation();
      }
    },
    // Действие при нажатии ENTER
    pressEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    // Генерация индекса случайного элемента массива
    getRandomIndex: function (array) {
      return array[Math.floor((Math.random() * array.length))];
    }
  };
})();
