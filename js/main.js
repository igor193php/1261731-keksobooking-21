"use strict";

(function () {

  const posts = window.data.posts(8);
  const pinTemplates = window.template.getTemplate('#pin', '.map__pin');
  const mapOverlayElement = document.querySelector('.map__pins');
  const pins = window.pin.createDomItem(posts, pinTemplates, mapOverlayElement);
  const cardTemplate = window.template.getTemplate('#card', '.map__card');
  const card = window.card.createDomCard(pins, cardTemplate, document.querySelector('.map'));

  window.settings.defaultSettings(window.settings.startSettings(pins));

})();
