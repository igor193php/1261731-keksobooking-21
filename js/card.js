"use strict";
(function () {

  const ENGLISH_NAME_ROOM_TO_RUSSIAN_NAME_ROOM = {
    flat: "Квартира",
    bungalow: "Бунгало",
    house: "Дом",
    place: "Дворец"
  };


  const mapOverlayElement = window.pin.mapOverlayElement;
  const createDomCard = function (jsObject, template, parentTeg) {

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
    const { popupTitleElement, textAddressElement, textPriceElement, popupTypeElement, textCapacityElement, textTimeElement, popupFeaturesElement, popupDescriptionElement, popupPhotosElement, popupAvatarElement } = ItemsPost;

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


  const cardTemplate = window.getTemplate.template('#card', '.map__card');

  const closePopupWindow = function () {
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

  const creatCard = function (pinLocationX, pinLocationY) {

    window.data.posts.forEach(function (value) {
      if (value.location.y === pinLocationY && value.location.x === pinLocationX) {
        createDomCard(value, cardTemplate, document.querySelector('.map'));
        closePopupWindow();
        document.querySelector('.map__card.popup').hidden = false;
      }
    });

  }

  mapOverlayElement.addEventListener('click', function (evt) {
    if (evt.target.matches('img')) {
      const imgElement = evt.target;
      const pinLocationX = evt.target.parentElement.offsetLeft - imgElement.clientWidth;
      const pinLocationY = evt.target.parentElement.offsetTop - imgElement.clientHeight;
      creatCard(pinLocationX, pinLocationY);
    }
  });

  mapOverlayElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keyboard.isEnterPressed) {
      const imgElement = evt.target.querySelector('img');
      const pinLocationX = evt.target.offsetLeft - imgElement.clientWidth;
      const pinLocationY = evt.target.offsetTop - imgElement.clientHeight;
      creatCard(pinLocationX, pinLocationY);
    }

  });
})();
