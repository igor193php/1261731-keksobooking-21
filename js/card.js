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
      popupTitle: template.querySelector('.popup__title'),
      textAddress: template.querySelector('.popup__text.popup__text--address'),
      textPrice: template.querySelector('.popup__text.popup__text--price'),
      popupType: template.querySelector('.popup__type'),
      textCapacity: template.querySelector('.popup__text--capacity'),
      textTime: template.querySelector('.popup__text--time'),
      popupFeatures: template.querySelector('.popup__text--time'),
      popupDescription: template.querySelector('.popup__description'),
      popupPhotos: template.querySelector('.popup__photos'),
      popupAvatar: template.querySelector('.popup__avatar')
    };
    const {popupTitle, textAddress, textPrice, popupType, textCapacity, textTime, popupFeatures, popupDescription, popupPhotos, popupAvatar} = ItemsPost;

    const mapFiltersContainerElement = document.querySelector('.map__filters-container');
    const imgPopupPhotoElement = popupPhotos.querySelector('img');
    popupTitle.textContent = jsObject.offer.title;
    textAddress.textContent = jsObject.offer.address;
    textPrice.textContent = jsObject.offer.price + "р/ночь";
    popupType.textContent = ENGLISH_NAME_ROOM_TO_RUSSIAN_NAME_ROOM[jsObject.offer.type];
    textCapacity.textContent = jsObject.offer.rooms + " комнаты для " + jsObject.offer.guests;
    textTime.textContent = "Заезд после " + jsObject.offer.checkin + ", выезд до " + jsObject.offer.checkout;
    popupFeatures.textContent = jsObject.offer.features;
    popupDescription.textContent = jsObject.offer.description;
    popupAvatar.src = jsObject.author.avatar;
    imgPopupPhotoElement.src = jsObject.offer.photos[0];

    if (jsObject.offer.photos.length > 1) {
      for (let i = 1; i < jsObject.offer.photos.length; i++) {
        let clonedElement = imgPopupPhotoElement.cloneNode(true);
        clonedElement.src = jsObject.offer.photos[i];
        popupPhotos.appendChild(clonedElement);
      }
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

  mapOverlayElement.addEventListener('click', function (evt) {
    if (evt.target.matches('img')) {
      const imgElement = evt.target;
      const pinLocationX = evt.target.parentElement.offsetLeft - imgElement.clientWidth;
      const pinLocationY = evt.target.parentElement.offsetTop - imgElement.clientHeight;

      window.data.posts.forEach(function (value) {
        if (value.location.y === pinLocationY && value.location.x === pinLocationX) {
          createDomCard(value, cardTemplate, document.querySelector('.map'));
          closePopupWindow();
          document.querySelector('.map__card.popup').hidden = false;
        }
      });
    }
  });

  mapOverlayElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keyboard.isEnterPressed) {
      const imgElement = evt.target.querySelector('img');
      const pinLocationX = evt.target.offsetLeft - imgElement.clientWidth;
      const pinLocationY = evt.target.offsetTop - imgElement.clientHeight;

      window.data.posts.forEach(function (value) {
        if (value.location.y === pinLocationY && value.location.x === pinLocationX) {
          createDomCard(value, cardTemplate, document.querySelector('.map'));
          closePopupWindow();
          document.querySelector('.map__card.popup').hidden = false;
        }
      });
    }

  });
})();
