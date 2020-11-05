'use strict';
(function () {


  const getData = function (data) {
    pinsData = data;

return pinsData;
  };

console.log();

window.loading.load("https://21.javascript.pages.academy/keksobooking/data", getData, window.poup.onError);

})();
