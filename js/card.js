"use strict";
(function () {

  const createDomCard = function (jsObject, template, parentTeg) {

    const ENGLISH_NAME_ROOM_TO_RUSSIAN_NAME_ROOM = {
      flat: "Квартира",
      bungalow: "Бунгало",
      house: "Дом",
      place: "Дворец"
    };

    const ItemsPost = {
      popupTitleElement: template.querySelector('.popup__title'),
      textAddressElement: template.querySelector('.popup__text.popup__text--address'),
      textPriceElement: template.querySelector('.popup__text.popup__text--price'),
      popupTypeElement: template.querySelector('.popup__type'),
      textCapacityElement: template.querySelector('.popup__text--capacity'),
      textTimeElement: template.querySelector('.popup__text--time'),
      popupFeaturesElement: template.querySelector('.popup__text--time'),
      popupDescriptionElement: template.querySelector('.popup__description'),
      popupPhotosElement: template.querySelector('.popup__photos'),
      popupAvatarElement: template.querySelector('.popup__avatar')
    };
    const {popupTitleElement, textAddressElement, textPriceElement, popupTypeElement, textCapacityElement, textTimeElement, popupFeaturesElement, popupDescriptionElement, popupPhotosElement, popupAvatarElement} = ItemsPost;

    const mapFiltersContainerElement = document.querySelector('.map__filters-container');
    const imgPopupPhotoElement = popupPhotosElement.querySelector('img');
    popupTitleElement.textContent = jsObject.offer.title;
    textAddressElement.textContent = jsObject.offer.address;
    textPriceElement.textContent = jsObject.offer.price + "р/ночь";
    popupTypeElement.textContent = ENGLISH_NAME_ROOM_TO_RUSSIAN_NAME_ROOM[jsObject.offer.type];
    textCapacityElement.textContent = jsObject.offer.rooms + " комнаты для " + jsObject.offer.guests;
    textTimeElement.textContent = "Заезд после " + jsObject.offer.checkin + ", выезд до " + jsObject.offer.checkout;
    popupFeaturesElement.textContent = jsObject.offer.features;
    popupDescriptionElement.textContent = jsObject.offer.description;
    popupAvatarElement.src = jsObject.author.avatar;
    imgPopupPhotoElement.src = jsObject.offer.photos[0];

    if (jsObject.offer.photos.length > 1) {
      jsObject.offer.photos.forEach(function (value) {
        let clonedElement = imgPopupPhotoElement.cloneNode(true);
        clonedElement.src = value;
        popupPhotosElement.appendChild(clonedElement);
      });
    }
    parentTeg.insertBefore(template, mapFiltersContainerElement);
  };

  window.card = {
    createDomCard: createDomCard
  };
})();
