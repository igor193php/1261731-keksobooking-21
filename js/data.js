"use strict";

(function () {
const onError = function (message) {
console.log(message);
};

const onSuccess = function (animals) {
  console.log(animals);
};

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    let error;
    switch (xhr.status) {
      case 200:
        onSucces(xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break
      case 401:
        error = 'Пользователь не авторизирован';
      case 404:
        error = 'Ничего не найдено';

      default:
        error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText
      );
}

if (error) {
  onError(error);
}
})
;

xhr.open('GET', 'https://21.javascript.pages.academy/keksobooking/data');
xhr.send();

window.data = {};
})
();
