'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 300;

  // Действие при нажатии ESC
  var onEscPress = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  // Запрет действия при нажатии ESC
  var disableEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  // Действие при нажатии ENTER
  var onEnterPress = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // Генерация индекса случайного элемента массива
  var getRandomIndex = function (array) {
    return array[Math.floor((Math.random() * array.length))];
  };

  // Устранение дребезга
  var removeDebounce = function (cb, interval = DEBOUNCE_INTERVAL) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };

  // Экспорт
  window.util = {
    onEscPress: onEscPress,
    disableEscPress: disableEscPress,
    onEnterPress: onEnterPress,
    getRandomIndex: getRandomIndex,
    removeDebounce: removeDebounce
  };
})();
