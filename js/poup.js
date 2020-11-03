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

  const onError = function (error) {
    const mapOverlayElement = document.querySelector('.map__pins');
    const errorTemplate = window.template.getTemplate('#error', '.error');
    const clonedElement = errorTemplate.cloneNode(true);
    const errorElement = clonedElement.querySelector('p');
    errorElement.textContent = error;
    mapOverlayElement.appendChild(clonedElement);

  };

  window.poup = {
    closePopupWindow: closePopupWindow,
    onError: onError
  };
})();
