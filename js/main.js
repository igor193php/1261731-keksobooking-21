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
    
		    
      const numberWithZerro = String(i+1).padStart(2, '0');
	
    
	
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

const posts = getPosts(8);
const mapOverlay = document.querySelector('.map__pins');

let classMap = document.querySelector('.map');
classMap.classList.remove('map--faded');

const getTemplate = function(idTemplate, classTemplate) {
  const pinTemplate = document.querySelector(idTemplate).content;

  return pinTemplate.querySelector(classTemplate);


};

const pinTemplates = getTemplate('#pin', '.map__pin');

const createDomItem = function(jsObject, template, parentTeg) {

  for (let i = 0; i < jsObject.length; i++) {
    let clonedElement = template.cloneNode(true);
    let img = clonedElement.querySelector('img');
    const locationX = jsObject[i].location.x + img.width;
    const locationY = jsObject[i].location.y + img.height;
    const stringLocation = "left: " + locationX + "px; " + "top: " + locationY + "px;";
    const newSrc = jsObject[i].author.avatar;


    clonedElement.setAttribute('style', stringLocation);
    img.src = newSrc;     
    img.alt = jsObject[i].offer.title;
    
   
    parentTeg.appendChild(clonedElement);
  }


};


createDomItem(posts, pinTemplates, mapOverlay);



