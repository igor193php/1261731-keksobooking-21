"use strict";

(function () {
  const PHOTOS = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];

  const FEATURES = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner"
  ];

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

  const MAX_LOCATION_Y = 630;
  const MIN_LOCATION_Y = 130;
  const MAX_ROOMS = 7;
  const MIN_ROOMS = 1;
  const MAX_GUESTS = 4;
  const MIN_GUESTS = 1;
  const MAX_GUESTS_OVER_THREE = 10;
  const MIX_GUESTS_OVER_THREE = 5;

  let getPosts = function (number) {

    const clientWidthElement = document.querySelector('.map__pins');
    let posts = [];

    let getRandomInteger = function (maxNumber, minNumber = 0) {
      let result = Math.floor(Math.random() * maxNumber);

      if (minNumber > 0) {
        result = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      }
      return result;
    };

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

  window.data = {
    posts: getPosts(8)
  };
})();
