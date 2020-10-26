"use strict";

(function () {
 
  let getPosts = function (number) {

    const clientWidthElement = document.querySelector('.map__pins');
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

  window.data = {
    posts: getPosts(8)
  };
})();