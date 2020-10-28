"use strict";

(function () {

  const posts = window.data.posts(8);
  const pinTemplates = window.template.getTemplate('#pin', '.map__pin');
  const mapOverlayElement = document.querySelector('.map__pins');

  const pins = window.pin.createDomItem;
  window.settings.defaultSettings(window.settings.startSettings(pins(posts, pinTemplates, mapOverlayElement)));

})();
