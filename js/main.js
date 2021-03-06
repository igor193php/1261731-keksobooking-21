"use strict";

(function () {
  const LIMIT_CLASES = 2;

  const mapPinMainElement = document.querySelector('.map__pin--main');
  const mapOverlayElement = document.querySelector('.map__pins');
  const pinTemplates = window.template.getTemplate('#pin', '.map__pin');
  const cardTemplate = window.template.getTemplate('#card', '.map__card');
  const mapElement = document.querySelector('.map');
  const addFormElement = document.querySelector('.ad-form');
  const avatarUserElement = document.querySelector('#avatar');
  const timeInElement = document.querySelector('#timein');
  const timeOutElement = document.querySelector('#timeout');
  const imagesElement = document.querySelector('#images');
  const pricePostElement = window.validation.pricePostElement;
  const mapFiltersElement = document.querySelector('.map__filters');

  let resultFilter = '';

  const onSuccess = function (data) {

    const posts = window.render.getLimitPosts(data);

    window.settings.defaultSettings();

    const onFormFilterChanged = function () {

      const cardPoupElement = document.querySelector('.map__card.popup');
      const activPins = document.querySelectorAll('.map__pin');
      const filterState = new FormData(mapFiltersElement);

      activPins.forEach(function (value) {
        if (value.classList.length < LIMIT_CLASES) {
          value.remove();
        }
      });

      if (cardPoupElement) {
        document.querySelector('.map__card.popup').hidden = true;
      }

      resultFilter = window.render.filterOffers(data, filterState);
      window.pin.createDomItem(resultFilter, pinTemplates, mapOverlayElement);

    };

    const onFormFilterChangedDebounced = function () {
      window.debounce.debounce(onFormFilterChanged);
    };

    mapFiltersElement.addEventListener('change', onFormFilterChangedDebounced);


    mapPinMainElement.addEventListener('click', function () {

      window.settings.startSettings();
      window.pin.createDomItem(posts, pinTemplates, mapOverlayElement);
    });

    mapPinMainElement.addEventListener('keydown', function (evt) {

      if (evt.keyCode === window.keyboard.isEnterPressed) {
        window.settings.startSettings();
        window.pin.createDomItem(posts, pinTemplates, mapOverlayElement);
      }

    });

    mapOverlayElement.addEventListener('click', function (evt) {

      if (evt.target.matches('img')) {
        const imgElement = evt.target;
        const pinLocationX = evt.target.parentElement.offsetLeft - imgElement.clientWidth;
        const pinLocationY = evt.target.parentElement.offsetTop - imgElement.clientHeight;

        posts.forEach(function (value) {
          if (value.location.y === pinLocationY && value.location.x === pinLocationX) {
            window.card.createDomCard(value, cardTemplate, mapElement);
            window.poup.closePopupWindow(mapOverlayElement);
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

        posts.forEach(function (value) {
          if (value.location.y === pinLocationY && value.location.x === pinLocationX) {
            window.card.createDomCard(value, cardTemplate, mapElement);
            window.poup.closePopupWindow(mapOverlayElement);
            document.querySelector('.map__card.popup').hidden = false;
          }
        });
      }
    });

  };

  window.loading.getConnection(onSuccess, window.poup.onError);

  addFormElement.addEventListener('click', function (evt) {

    if (evt.target.matches('#capacity')) {
      window.validation.validateCapacity();
    }
    if (evt.target.matches('#title')) {
      window.validation.validateTitle();
    }
    if (evt.target.matches('#price')) {
      window.validation.validatePrice();
    }
    if (evt.target.matches('#type')) {
      pricePostElement.setAttribute('placeholder', window.validation.minCostsForTypeRooms[evt.target.value]);
    }

    if (evt.target.matches('#avatar')) {
      avatarUserElement.setAttribute('accept', 'image/png, image/jpeg');
    }

    if (evt.target.matches('#timein')) {
      timeOutElement.value = evt.target.value;
    }

    if (evt.target.matches('#timeout')) {
      timeInElement.value = evt.target.value;
    }

    if (evt.target.matches('#images')) {
      imagesElement.setAttribute('accept', 'image/png, image/jpeg');
    }
  });


  addFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.loading.getConnection(window.poup.getSuccessMessegeAfterSendForm, window.poup.onError, new FormData(addFormElement));
  });

  addFormElement.addEventListener('reset', function (evt) {
    evt.preventDefault();
    window.validation.recetAddForm();
  });

  window.main = {
    mapPinMainElement: mapPinMainElement,
    mapOverlayElement: mapOverlayElement,
    addFormElement: addFormElement,
    pinTemplates: pinTemplates,
    onSuccess: onSuccess
  };
})();
