"use strict";

(function (){
  const NUMBER_KEY_ENTER = 13;
  const KEY_ESC = 27;

  window.keyboard = {
    isEnterPressed: function (evt) {
      return evt.keyCode === NUMBER_KEY_ENTER;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === KEY_ESC;
    }

  };

})();
