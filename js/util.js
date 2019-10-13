'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  //Переменные DOM
  var userNameInputElement = document.querySelector('.setup-user-name');

  window.util = {
    // Действие при нажатии ESC
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInputElement) {
        action();
      }
    },
    // Действие при нажатии ENTER
    isEnterEvent: function (evt, action) {
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
