"use strict"
let getRandomInteger = function(maxNumber, minNumber = 0) {
  let result = Math.floor(Math.random() * maxNumber);

  if (0 < minNumber) {
     result = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    }

  return result;
};



let getPosts = function(number)
{
  let clientWidth = document.querySelector('.map__pins');
  let typeFlat = [
    "palace",
    "flat",
    "house",
    "bungalow"
  ];
  let checkTime = [
    "12:00",
    "13:00",
    "14:00"
  ];
  let features = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner"
  ];
let photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

  let posts = [];
    for (let i = 0; i < number; i++)
    {
      let locationX = getRandomInteger(clientWidth.clientWidth);
      let locationY = getRandomInteger(630, 130);
      let rooms = getRandomInteger(7, 1);
      let getGuests = function(rooms) {
          let guests = getRandomInteger(4, 1);
          if (3 < rooms) {
            guests = getRandomInteger(10, 5);
          }
          return guests;
        };
      let getItems = function(getRandomInteger, features) {
        let result = [];
        for (let i = 0; i <= getRandomInteger; i++) {
          result[i] = features[i];
        }
        return result;
      };
    const numberWithZerro = String(number).padStart(2, '0');

        posts[i] =
          {
            "author": {
                "avatar": 'img/avatars/user' + numberWithZerro + '.png'
            },
            "offer": {
                "title": "Заголовок предложения " + i,
                "address": locationX + ", " + locationY,
                "price":  getRandomInteger(100000),
                "type": typeFlat[getRandomInteger(3)],
                "rooms": rooms,
                "guests": getGuests(rooms),
                "checkin": checkTime[getRandomInteger(2)],
                "checkout": checkTime[getRandomInteger(2)],
                "features": getItems(getRandomInteger(5), features),
                "description": "О писание объявления " + i,
                "photos": getItems(getRandomInteger(2), photos)
            },
            "location": {
                "x": locationX,
                "y": locationY
            }
          }

    };

    return posts;
};

let classMap = document.querySelector('.map');
classMap.classList.remove('map--faded');

const makeElement = function(jsObject) {

};

const createDomItem = function() {
    
};

for () {
    createDomItem();
};
console.log(getPosts(8));
