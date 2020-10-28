"use strict";
(function () {

  const createDomItem = function (jsObject, template, parentTeg) {

    jsObject.forEach(function (value) {
      let clonedElement = template.cloneNode(true);
      let imgElement = clonedElement.querySelector('img');
      const locationX = value.location.x + imgElement.width;
      const locationY = value.location.y + imgElement.height;
      const stringLocation = "left: " + locationX + "px; " + "top: " + locationY + "px;";
      const newSrc = value.author.avatar;

      clonedElement.setAttribute('style', stringLocation);
      imgElement.src = newSrc;
      imgElement.alt = value.offer.title;

      parentTeg.appendChild(clonedElement);
    });
  };

  window.pin = {
    createDomItem: createDomItem
  };
})();
