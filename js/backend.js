(function () {
  // Константы
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 10000;

  // Создание запроса
  var  makeRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
    });
  };

  // Загрузка данных с сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    makeRequest(xhr, onLoad, onError);

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  // Сохранение загруженных данных
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    makeRequest(xhr, onLoad, onError);

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  // Экспорт
  window.backend = {
    load: load,
    save: save
  };
})();
