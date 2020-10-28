"use strict";

(function () {

  window.settings.defaultSettings(window.settings.startSettings);

  const posts = window.data.posts(8);
  const pinTemplates = window.getTemplate.template('#pin', '.map__pin');
  const mapOverlayElement = document.querySelector('.map__pins');
  createDomItem(posts, pinTemplates, mapOverlayElement);


})();
