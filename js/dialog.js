'use strict';

(function () {
  // Элементы DOM
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var dialogHandleElement = document.querySelector('.upload');

  // Открытие окна
  var onSetupOpenClick = function () {
    window.setup.renderPopup();
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Закрытие окна
  var onSetupCloseClick = function () {
    setupElement.classList.add('hidden');
    setupElement.style.removeProperty('top');
    setupElement.style.removeProperty('left');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Закрытие окна по ESC при отсутствии фокуса на элементе внутри него
  var onPopupEscPress = function (evt) {
    window.util.onEscPress(evt, onSetupCloseClick);
  };

  // Обработчики событий DOM
  setupOpenElement.addEventListener('click', onSetupOpenClick);

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, onSetupOpenClick);
  });

  setupCloseElement.addEventListener('click', onSetupCloseClick);

  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, onSetupCloseClick);
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
