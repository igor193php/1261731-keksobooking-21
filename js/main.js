"use strict";
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

const NUMBER_KEY_ENTER = 13;
const KEY_ESC = 27;

const MAX_LOCATION_Y = 630;
const MIN_LOCATION_Y = 130;
const MAX_ROOMS = 7;
const MIN_ROOMS = 1;
const MAX_GUESTS = 4;
const MIN_GUESTS = 1;
const MAX_GUESTS_OVER_THREE = 10;
const MIX_GUESTS_OVER_THREE = 5;

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_ROOM = 1000000;

const TYPE_FLATS = [
  "palace",
  "flat",
  "house",
  "bungalow"
];
const CHECK_TIMES = [
  "12:00",
  "13:00",
  "14:00"
];
const FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];
const PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

const ENGLISH_NAME_ROOM_TO_RUSSIAN_NAME_ROOM = {
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Дом",
  place: "Дворец"
};

const MIN_COSTS_FOR_TYPE_ROOMS = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000
};

const mapPinMainElement = document.querySelector('.map__pin--main');
const mapOverlayElement = document.querySelector('.map__pins');
const addFormElement = document.querySelector('.ad-form');
const listAddFormElements = addFormElement.querySelectorAll('.ad-form-header, .ad-form__element');
const mapFiltersElement = document.querySelector('.map__filters');
const listMapFiltersElements = mapFiltersElement.querySelectorAll('.map__filter, .map__features');
const mapElement = document.querySelector('.map');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const adressElement = document.querySelector('#address');
const titlePostElement = document.querySelector('#title');
const typePostElement = document.querySelector('#type');
const pricePostElement = document.querySelector('#price');
const avatarUserElement = document.querySelector('#avatar');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const imagesElement = document.querySelector('#images');
