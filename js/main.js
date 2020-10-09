"use strict";

const mapPinMainElement = document.querySelector('.map__pin--main');
const addFormElement = document.querySelector('.ad-form');
const listAddFormElements = addFormElement.children;
const mapFiltersElement = document.querySelector('.map__filters');
const listMapFiltersElement = mapFiltersElement.children;
const mapElement = document.querySelector('.map');

let getRandomInteger = function (maxNumber, minNumber = 0) {
  let result = Math.floor(Math.random() * maxNumber);

  if (minNumber > 0) {
    result = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  return result;
};

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

const MAX_LOCATION_Y = 630;
const MIN_LOCATION_Y = 130;
const MAX_ROOMS = 7;
const MIN_ROOMS = 1;
const MAX_GUESTS = 4;
const MIN_GUESTS = 1;
const MAX_GUESTS_OVER_THREE = 10;
const MIX_GUESTS_OVER_THREE = 5;

let getPosts = function (number) {
  let clientWidthElement = document.querySelector('.map__pins');

  let posts = [];
  for (let i = 0; i < number; i++) {
    let locationX = getRandomInteger(clientWidthElement.clientWidth);
    let locationY = getRandomInteger(MAX_LOCATION_Y, MIN_LOCATION_Y);
    let rooms = getRandomInteger(MAX_ROOMS, MIN_ROOMS);
    let getGuests = function (numberRooms) {
      let guests = getRandomInteger(MAX_GUESTS, MIN_GUESTS);
      if (numberRooms > 3) {
        guests = getRandomInteger(MAX_GUESTS_OVER_THREE, MIX_GUESTS_OVER_THREE);
      }
      return guests;
    };
    let getItems = function (numberItems, features) {
      let result = [];
      for (let j = 0; j <= numberItems; j++) {
        result[j] = features[j];
      }
      return result;
    };


    const numberWithZerro = String(i + 1).padStart(2, '0');


    posts[i] =
      {
        "author": {
          "avatar": 'img/avatars/user' + numberWithZerro + '.png'
        },
        "offer": {
          "title": "Заголовок предложения " + i,
          "address": locationX + ", " + locationY,
          "price": getRandomInteger(100000),
          "type": TYPE_FLATS[getRandomInteger(3)],
          "rooms": rooms,
          "guests": getGuests(rooms),
          "checkin": CHECK_TIMES[getRandomInteger(2)],
          "checkout": CHECK_TIMES[getRandomInteger(2)],
          "features": getItems(getRandomInteger(5), FEATURES),
          "description": "О писание объявления " + i,
          "photos": getItems(getRandomInteger(2), PHOTOS)
        },
        "location": {
          "x": locationX,
          "y": locationY
        }
      };
  }

  return posts;
};

const posts = getPosts(8);
const mapOverlayElement = document.querySelector('.map__pins');


const getTemplate = function (idTemplate, classTemplate) {
  const pinTemplateElement = document.querySelector(idTemplate).content;

  return pinTemplateElement.querySelector(classTemplate);

};

const pinTemplates = getTemplate('#pin', '.map__pin');

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

for (let i = 0; i < listMapFiltersElement.length; i++) {

  listMapFiltersElement[i].setAttribute('disabled', 'disabled');
}

for (let i = 0; i < listAddFormElements.length; i++) {
  listAddFormElements[i].setAttribute('disabled', 'disabled');

}

const actionDefaultForStart = function() {
  createDomItem(posts, pinTemplates, mapOverlayElement);
  addFormElement.classList.remove('ad-form--disabled');
  mapElement.classList.remove('map--faded');
  for (let i = 0; i < listMapFiltersElement.length; i++) {

    listMapFiltersElement[i].removeAttribute('disabled');
  }

  for (let i = 0; i < listAddFormElements.length; i++) {
    listAddFormElements[i].removeAttribute('disabled');

  }
};

mapPinMainElement.addEventListener('click', function () {
  actionDefaultForStart();
});
