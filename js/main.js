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

  listMapFiltersElements.forEach(function (value) {
    value.removeAttribute('disabled');
  });

  listAddFormElements.forEach(function (value) {
    value.removeAttribute('disabled');
  });

};

mapPinMainElement.addEventListener('click', function () {
  actionDefaultForStart();
});

mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === NUMBER_KEY_ENTER) {
    actionDefaultForStart();
  }
});

addFormElement.addEventListener('click', function () {


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
});


adressElement.value = mapPinMainElement.offsetLeft + ', ' + mapPinMainElement.offsetTop;

createDomItem(posts, pinTemplates, mapOverlayElement);


const createDomCard = function (jsObject, template, parentTeg) {
  const EnglishNameRoomToRussianNameRoom = {
    flat: "Квартира",
    bungalow: "Бунгало",
    house: "Дом",
    place: "Дворец"
  };
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
  popupType.textContent = EnglishNameRoomToRussianNameRoom[jsObject.offer.type];
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

const cardTemplate = getTemplate('#card', '.map__card');
createDomCard(posts[0], cardTemplate, document.querySelector('.map'));


