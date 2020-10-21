"use strict";

const numberWithZerro = String(i + 1).padStart(2, '0');

let getRandomInteger = function (maxNumber, minNumber = 0) {
  let result = Math.floor(Math.random() * maxNumber);

  if (minNumber > 0) {
    result = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  return result;
};

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
  if (evt.keyCode === NUMBER_KEY_ENTER) {
    actionDefaultForStart();
  }
});
adressElement.value = mapPinMainElement.offsetLeft + ', ' + mapPinMainElement.offsetTop;
