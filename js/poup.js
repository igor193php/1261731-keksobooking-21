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
    const mainTegElement = document.querySelector('main');
    const errorTemplate = window.template.getTemplate('#error', '.error');
    const clonedElement = errorTemplate.cloneNode(true);
    const errorElement = clonedElement.querySelector('p');
    errorElement.textContent = error;
    mainTegElement.appendChild(clonedElement);

    const errorPoupElement = document.querySelector('.error');

    document.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorPoupElement.hidden = true;
    });
    document.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.keyboard.isEscPressed) {
        errorPoupElement.hidden = true;
      }
    });

  };

  const getSuccessMessegeAfterSendForm = function () {
    const mainTegElement = document.querySelector('main');
    const successTemplate = window.template.getTemplate('#success', '.success');
    const clonedElement = successTemplate.cloneNode(true);
    mainTegElement.appendChild(clonedElement);
    window.main.addFormElement.reset();

    const successPoupElement = document.querySelector('.success');

    document.addEventListener('click', function () {
      successPoupElement.hidden = true;
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keyboard.isEscPressed) {
        successPoupElement.hidden = true;
      }
    });

  };

  window.poup = {
    closePopupWindow: closePopupWindow,
    onError: onError,
    getSuccessMessegeAfterSendForm: getSuccessMessegeAfterSendForm
  };
})();
