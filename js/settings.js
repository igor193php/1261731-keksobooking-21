"use strict";
(function () {

  const mapFiltersElement = document.querySelector('.map__filters');
  const listMapFiltersElements = mapFiltersElement.querySelectorAll('.map__filter, .map__features');
  const addFormElement = document.querySelector('.ad-form');
  const listAddFormElements = addFormElement.querySelectorAll('.ad-form-header, .ad-form__element');
  const adressElement = document.querySelector('#address');

  const setDefaultSettings = function (startSettings) {

    const MIN_COSTS_FOR_TYPE_ROOMS = {
      flat: 1000,
      bungalow: 0,
      house: 5000,
      palace: 10000
    };

    const mapPinMainElement = document.querySelector('.map__pin--main');
    const pricePostElement = document.querySelector('#price');
    const typePostElement = document.querySelector('#type');

    pricePostElement.setAttribute('placeholder', MIN_COSTS_FOR_TYPE_ROOMS[typePostElement.value]);

    listMapFiltersElements.forEach(function (value) {
      value.setAttribute('disabled', 'disabled');
    });

    listAddFormElements.forEach(function (value) {
      value.setAttribute('disabled', 'disabled');
    });
    adressElement.value = mapPinMainElement.offsetLeft + ', ' + mapPinMainElement.offsetTop;

    mapPinMainElement.addEventListener('click', function () {
      startSettings();
    });

    mapPinMainElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keyboard.isEnterPressed) {
        startSettings();
      }
    });
  };

  const actionDefaultForStart = function (pins) {
pins();
    const mapElement = document.querySelector('.map');

    addFormElement.classList.remove('ad-form--disabled');
    mapElement.classList.remove('map--faded');
    adressElement.setAttribute('disabled', 'disabled');

    listMapFiltersElements.forEach(function (value) {
      value.removeAttribute('disabled');
    });

    listAddFormElements.forEach(function (value) {
      value.removeAttribute('disabled');
    });
  };

  window.settings = {
    defaultSettings: setDefaultSettings,
    startSettings: actionDefaultForStart
  };
})();
