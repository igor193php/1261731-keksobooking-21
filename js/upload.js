"use strict";

(function () {
  const StatusCodeHttp = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    NOT_USER: 401
  };

  const URL = 'https://21.javascript.pages.academy/keksobooking';
  const TIME_OUT = 10000;
  const upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      let error;
      switch (xhr.status) {
        case StatusCodeHttp.OK:
          onSuccess();
          break;
        case StatusCodeHttp.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCodeHttp.NOT_USER:
          error = 'Пользователь не авторизован';
          break;
        case StatusCodeHttp.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT; // 10s
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    upload: upload
  };
})();
