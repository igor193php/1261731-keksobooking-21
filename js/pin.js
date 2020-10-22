"use strict";
(function () {

  const MIN_COSTS_FOR_TYPE_ROOMS = {
    flat: 1000,
    bungalow: 0,
    house: 5000,
    palace: 10000
  };

  const posts = window.data.posts;
  const mapFiltersElement = document.querySelector('.map__filters');
  const mapPinMainElement = document.querySelector('.map__pin--main');
  const mapOverlayElement = document.querySelector('.map__pins');
  const adressElement = document.querySelector('#address');
  const mapElement = document.querySelector('.map');
  const addFormElement = document.querySelector('.ad-form');
  const listAddFormElements = addFormElement.querySelectorAll('.ad-form-header, .ad-form__element');
  const pricePostElement = document.querySelector('#price');
  const listMapFiltersElements = mapFiltersElement.querySelectorAll('.map__filter, .map__features');
  const typePostElement = document.querySelector('#type');

  const pinTemplates = window.getTemplate.template('#pin', '.map__pin');

  const createDomItem = function (jsObject, template, parentTeg) {

    for (let i = 0; i < jsObject.length; i++) {
      let clonedElement = template.cloneNode(true);
      let imgElement = clonedElement.querySelector('img');
      const locationX = jsObject[i].location.x + imgElement.width;
      const locationY = jsObject[i].location.y + imgElement.height;
      const stringLocation = "left: " + locationX + "px; " + "top: " + locationY + "px;";
      const newSrc = jsObject[i].author.avatar;

      clonedElement.setAttribute('style', stringLocation);
      imgElement.src = newSrc;
      imgElement.alt = jsObject[i].offer.title;

      parentTeg.appendChild(clonedElement);
    }

  };

  pricePostElement.setAttribute('placeholder', MIN_COSTS_FOR_TYPE_ROOMS[typePostElement.value]);

  listMapFiltersElements.forEach(function (value) {
    value.setAttribute('disabled', 'disabled');
  });

  listAddFormElements.forEach(function (value) {
    value.setAttribute('disabled', 'disabled');
  });

  const actionDefaultForStart = function () {

    createDomItem(posts, pinTemplates, mapOverlayElement);
    addFormElement.classList.remove('ad-form--disabled');
    mapElement.classList.remove('map--faded');
    adressElement.setAttribute('disabled', 'disabled');

    listMapFiltersElements.forEach(function (value) {
      value.removeAttribute('disabled');
    });

    listAddFormElements.forEach(function (value) {
      value.removeAttribute('disabled');
    });

    createDomItem(posts, pinTemplates, mapOverlayElement);
  };

  mapPinMainElement.addEventListener('click', function () {
    actionDefaultForStart();
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keyboard.isEnterPressed) {
      actionDefaultForStart();
    }
  });
  adressElement.value = mapPinMainElement.offsetLeft + ', ' + mapPinMainElement.offsetTop;

  window.pin = {
    mapOverlayElement: mapOverlayElement,
    addFormElement: addFormElement,
    pricePostElement: pricePostElement
  };
})();
