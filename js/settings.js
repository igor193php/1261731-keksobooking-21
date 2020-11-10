"use strict";
(function () {

  const mapElement = document.querySelector('.map');
  const mapFiltersElement = document.querySelector('.map__filters');
  const listMapFiltersElements = mapFiltersElement.querySelectorAll('.map__filter, .map__features');
  const addFormElement = document.querySelector('.ad-form');
  const listAddFormElements = addFormElement.querySelectorAll('.ad-form-header, .ad-form__element');
  const adressElement = document.querySelector('#address');

  const setDefaultSettings = function () {

    const MIN_COSTS_FOR_TYPE_ROOMS = {
      flat: 1000,
      bungalow: 0,
      house: 5000,
      palace: 10000
    };

    const pinElements = document.querySelectorAll('.map__pin');
    const mapPinMainElement = document.querySelector('.map__pin--main');
    const pricePostElement = document.querySelector('#price');
    const typePostElement = document.querySelector('#type');

    pricePostElement.setAttribute('placeholder', MIN_COSTS_FOR_TYPE_ROOMS[typePostElement.value]);

    mapElement.classList.add('map--faded');

    pinElements.forEach(function (value) {
      value.setAttribute('hidden', 'hidden');
    });

    mapPinMainElement.removeAttribute('hidden');

    listMapFiltersElements.forEach(function (value) {
      value.setAttribute('disabled', 'disabled');
    });

    listAddFormElements.forEach(function (value) {
      value.setAttribute('disabled', 'disabled');
    });

    adressElement.value = mapPinMainElement.offsetLeft + ', ' + mapPinMainElement.offsetTop;

  };

  const actionDefaultForStart = function () {

    addFormElement.classList.remove('ad-form--disabled');
    mapElement.classList.remove('map--faded');
    adressElement.setAttribute('readonly', 'readonly');

    listMapFiltersElements.forEach(function (value) {
      value.removeAttribute('disabled');
    });

    listAddFormElements.forEach(function (value) {
      value.removeAttribute('disabled');
    });
  };

  window.settings = {
    defaultSettings: setDefaultSettings,
    startSettings: actionDefaultForStart,
    address: adressElement
  };
})();
