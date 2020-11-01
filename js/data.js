"use strict";

(function () {

  const MOCK_TITLES = [
    "pulvinar sapien et",
    "posuere sollicitudin aliquam",
    "arcu cursus vitae congue mauris",
    "sagittis purus sit amet volutpat",
    "hendrerit dolor magna",
    "viverra vitae congue eu consequat",
    "nunc sed id semper risus",
    "quis imperdiet massa"
  ];

  const MOCK_DESCRIPTIONS = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
    "din nibh sit amet commodo nulla facilisi nullam. Pellentesque diam volutpat commodo sed egestas eg",
    "cus luctus accumsan tortor. Amet purus gravida quis blandit turpis cursus in hac habitasse.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    "vitae semper quis lectus nulla at. Vel orci porta non pulvinar. Enim nunc faucibus a ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali",
    "gittis eu volutpat odio facilisis mauris. Malesuada fames ac turpis egestas integer eget al",
    "Metus vulputate eu scelerisque felis imperdiet proin fermentum. Ipsum consequat nisl vel pretium."
  ];
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
  const MOCK_PRICE = 30000;
  const NUMBER_CHOICE_TIME = 2;
  const NUMBER_CHOICE_TYPE_FLAT = 3;
  const NUMBER_CHOICE_FEATURE = 5;
  const NUMBER_CHOICE_PHOTO = 2;

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

      const getRandomElementFromArray = function (arrayItems, numberForChoice) {
        const randomNumber = getRandomInteger(numberForChoice);
        return arrayItems[randomNumber];
      };

      posts[i] =
        {
          "author": {
            "avatar": 'img/avatars/user' + numberWithZerro + '.png'
          },
          "offer": {
            "title": getRandomElementFromArray(MOCK_TITLES, number),
            "address": locationX + ", " + locationY,
            "price": getRandomInteger(MOCK_PRICE),
            "type": getRandomElementFromArray(TYPE_FLATS, NUMBER_CHOICE_TYPE_FLAT),
            "rooms": rooms,
            "guests": getGuests(rooms),
            "checkin": getRandomElementFromArray(CHECK_TIMES, NUMBER_CHOICE_TIME),
            "checkout": getRandomElementFromArray(CHECK_TIMES, NUMBER_CHOICE_TIME),
            "features": getRandomElementFromArray(FEATURES, NUMBER_CHOICE_FEATURE),
            "description": getRandomElementFromArray(MOCK_DESCRIPTIONS, number),
            "photos": getItems(getRandomInteger(NUMBER_CHOICE_PHOTO), PHOTOS)
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
    posts: getPosts
  };
})();
