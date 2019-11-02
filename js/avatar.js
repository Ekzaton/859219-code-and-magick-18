'use strict';

(function () {
  // Константы
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Элементы DOM
  var uploadInputElement = document.querySelector('.upload input[type=file]');
  var setupUserPicElement = document.querySelector('.setup-user-pic');

  // Обработчики событий DOM
  uploadInputElement.addEventListener('change', function () {
    var file = uploadInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        setupUserPicElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
