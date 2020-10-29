"use strict";

(function () {

  const posts = window.data.posts(8);
  const pinTemplates = window.template.getTemplate('#pin', '.map__pin');
  const mapOverlayElement = document.querySelector('.map__pins');
  const pins = window.pin.createDomItem(posts, pinTemplates, mapOverlayElement);

  window.settings.defaultSettings(window.settings.startSettings(pins));

  const cardTemplate = window.template.getTemplate('#card', '.map__card');
  const locationPin = window.location.getLocationChoicePin(mapOverlayElement);
  const postForCard = window.location.getChoicedPost(locationPin);
  const card = window.card.createDomCard(postForCard, cardTemplate, document.querySelector('.map'));

  if (card) {
    window.poup.closePopupWindow();
    document.querySelector('.map__card.popup').hidden = false;
  }
})();
