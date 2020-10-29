"use strict";

(function () {

  const closePopupWindow = function (mapOverlayElement) {

    const buttonClosePopupElement = document.querySelector('.popup__close');
    const popupCardElement = document.querySelector('.map__card.popup');

    buttonClosePopupElement.addEventListener('click', function () {
      popupCardElement.hidden = true;
    });
    mapOverlayElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keyboard.isEscPressed) {
        popupCardElement.hidden = true;
      }
    });
  };

  window.poup = {
    closePopupWindow: closePopupWindow
  };
})();
