"use strict";

(function () {
  const dbConnection = function (url) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      console.log(xhr.status + ' ' + xhr.statusText);
    });
    xhr.open('GET', url);
    xhr.send();
  };


})();
