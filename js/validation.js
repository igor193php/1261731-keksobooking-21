"use strict";
(function () {
const MIN_COSTS_FOR_TYPE_ROOMS = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_ROOM = 1000000;

const NUMBER_OF_ROOMS = [
  "1",
  "2",
  "3",
  "100"
];

const NUMBER_CAPACITY = [
  "0",
  "1",
  "2",
  "3"
];

const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const titlePostElement = document.querySelector('#title');
const typePostElement = document.querySelector('#type');
const avatarUserElement = document.querySelector('#avatar');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const imagesElement = document.querySelector('#images');

const checkNumberIsNumeric = function (value) {
  return /^\d+$/.test(value);
};

window.pin.addFormElement.addEventListener('click', function (evt) {
  if (evt.target.matches('#capacity')) {
    if (roomNumberElement.value === NUMBER_OF_ROOMS[0] && capacityElement.value !== NUMBER_CAPACITY[1]) {
      capacityElement.setCustomValidity("Заселить можно не более 1 гостя");
    } else if (roomNumberElement.value === NUMBER_OF_ROOMS[1]) {
      if (capacityElement.value > NUMBER_CAPACITY[2] || capacityElement.value === NUMBER_CAPACITY[0]) {
        capacityElement.setCustomValidity("Заселить можно 1 или 2 гостя");
      }
    } else if (roomNumberElement.value === NUMBER_OF_ROOMS[2] && capacityElement.value === NUMBER_CAPACITY[0]) {
      capacityElement.setCustomValidity("Заселить можно от 1 до 3 гостей");
    } else if (roomNumberElement.value === NUMBER_OF_ROOMS[3] && capacityElement.value !== NUMBER_CAPACITY[0]) {
      capacityElement.setCustomValidity("Гостей селить нельзя");
    } else {
      capacityElement.setCustomValidity('');
    }
    capacityElement.reportValidity();
  }

  if (evt.target.matches('#title')) {
    titlePostElement.setAttribute('required', '');
    if (titlePostElement.value.length < MIN_TITLE_LENGTH) {
      titlePostElement.setCustomValidity("Заголовок должен быть не меньше " + MIN_TITLE_LENGTH + " символов.");
    } else if (titlePostElement.value.length > MAX_TITLE_LENGTH) {
      titlePostElement.setCustomValidity("Заголовок должен быть не больше " + MAX_TITLE_LENGTH + " символов.");
    } else {
      titlePostElement.setCustomValidity('');
    }
    titlePostElement.reportValidity();
  }

  if (evt.target.matches('#price')) {
    pricePostElement.setAttribute('required', '');
    if (typePostElement.value === "bungalow" && pricePostElement.value < MIN_COSTS_FOR_TYPE_ROOMS["bungalow"]) {
      pricePostElement.setCustomValidity("Цена за бунгало должна быть не меньше 0");
    } else if (typePostElement.value === "flat" && pricePostElement.value < MIN_COSTS_FOR_TYPE_ROOMS["flat"]) {
      pricePostElement.setCustomValidity("Цена за квартиру должна быть не меньше " + MIN_COSTS_FOR_TYPE_ROOMS["flat"] + " рублей за ночь");
    } else if (typePostElement.value === "house" && pricePostElement.value < MIN_COSTS_FOR_TYPE_ROOMS["house"]) {
      pricePostElement.setCustomValidity("Цена за дом должна быть не меньше " + MIN_COSTS_FOR_TYPE_ROOMS["house"] + " рублей за ночь");
    } else if (typePostElement.value === "palace" && pricePostElement.value < MIN_COSTS_FOR_TYPE_ROOMS["palace"]) {
      pricePostElement.setCustomValidity("Цена за дом должна быть не меньше " + MIN_COSTS_FOR_TYPE_ROOMS["palace"] + " рублей за ночь");
    } else if (!checkNumberIsNumeric(pricePostElement.value)) {
      pricePostElement.setCustomValidity("Введите целое положительное число");
    } else if (pricePostElement.value > MAX_PRICE_ROOM) {
      pricePostElement.setCustomValidity("Цена превышает максимальный размер в " + MAX_PRICE_ROOM + " рублей");
    } else {
      pricePostElement.setCustomValidity('');
    }
    pricePostElement.reportValidity();
  }

  if (evt.target.matches('#type')) {
    pricePostElement.setAttribute('placeholder', MIN_COSTS_FOR_TYPE_ROOMS[evt.target.value]);
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
})();
