'use strict';
(function () {
  const DEEOUNCE_INTERVAL = 3000;

  const debounce = function (cb, ...parameters) {

    let lastTimeout = null;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      return cb(...parameters);
    }, DEEOUNCE_INTERVAL);

  };

  window.debounce = {
    debounce: debounce
  };

})();
