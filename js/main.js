"use strict";

(function () {
  const mapPinMainElement = document.querySelector('.map__pin--main');

  window.settings.defaultSettings();

  mapPinMainElement.addEventListener('click', function () {
    window.settings.startSettings();
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keyboard.isEnterPressed) {
      window.settings.startSettings();
    }
  });

  const posts = window.data.posts(8);
  const pinTemplates = window.template.getTemplate('#pin', '.map__pin');
  const mapOverlayElement = document.querySelector('.map__pins');
  window.pin.createDomItem(posts, pinTemplates, mapOverlayElement);


  const cardTemplate = window.template.getTemplate('#card', '.map__card');
  const locationPin = window.coords.getLocationChoicePin(mapOverlayElement);
  if (locationPin) {
  const postForCard = window.coords.getChoicedPost(posts, locationPin);
  const card = window.card.createDomCard(postForCard, cardTemplate, document.querySelector('.map'));



    window.poup.closePopupWindow();
    document.querySelector('.map__card.popup').hidden = false;
  }
})();
