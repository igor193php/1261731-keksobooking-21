"use sctrict";
(function () {
const showPopupWindow = function (posts, mapOverlayElement) {

  const creatCard = function (posts, pinLocationX, pinLocationY) {
    posts.forEach(function (value) {
      if (value.location.y === pinLocationY && value.location.x === pinLocationX) {
        //createDomCard(value, cardTemplate, document.querySelector('.map'));
        //closePopupWindow();
        document.querySelector('.map__card.popup').hidden = false;
      }
    });
  };

  mapOverlayElement.addEventListener('click', function (evt) {
    if (evt.target.matches('img')) {
      const imgElement = evt.target;
      const pinLocationX = evt.target.parentElement.offsetLeft - imgElement.clientWidth;
      const pinLocationY = evt.target.parentElement.offsetTop - imgElement.clientHeight;
      closePopupWindow();
      creatCard(pinLocationX, pinLocationY);
    }
  });

  mapOverlayElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keyboard.isEnterPressed) {
      const imgElement = evt.target.querySelector('img');
      const pinLocationX = evt.target.offsetLeft - imgElement.clientWidth;
      const pinLocationY = evt.target.offsetTop - imgElement.clientHeight;
      closePopupWindow();
      creatCard(pinLocationX, pinLocationY);

    }
  });
};

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
