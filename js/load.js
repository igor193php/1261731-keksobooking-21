"use strict";

(function () {
  const load = function (url, data, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      console.log(xhr.status + ' ' + xhr.statusText);
    });
    xhr.open('GET', url);
    xhr.send();
  };

window.load = {
  load: load
};
})();
