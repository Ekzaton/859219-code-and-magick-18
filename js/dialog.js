'use strict';

(function () {
  // Переменные
  var popupIsOpened = false;

  // Элементы DOM
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var dialogHandleElement = document.querySelector('.upload');

  // Открытие окна
  var openPopup = function () {
    if (!popupIsOpened) {
      window.setup.renderPopup();
      popupIsOpened = true;
    }
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Закрытие окна
  var closePopup = function () {
    setupElement.classList.add('hidden');
    setupElement.style.removeProperty('top');
    setupElement.style.removeProperty('left');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Закрытие окна по ESC при отсутствии фокуса на элементе внутри него
  var onPopupEscPress = function (evt) {
    window.util.pressEscEvent(evt, closePopup);
  };

  // Обработчики событий DOM
  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.pressEnterEvent(evt, openPopup);
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.pressEnterEvent(evt, closePopup);
  });

  dialogHandleElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandleElement.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandleElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
