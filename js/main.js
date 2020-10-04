"use strict"
let randomInteger = Math.floor(Math.random() * 3);

const auther =
[
  {
    "userId": '01',
  },
  {
    "userId": '02',
  },
  {
    "userId": '03',
  },
  {
    "userId": '04',
  },
  {
    "userId": '05',
  },
  {
    "userId": '06',

  },
  {
    "userId": '07',

  },
  {
    "userId": '08',

  }

];

const getPosts = function(avatarNumber)
{
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

];

  let posts = [];
    for (let i = 0; i < avatarNumber.length; i++)
    {

        posts[i] =
          {
            "author": {
                "avatar": 'img/avatars/user' + avatarNumber[i]['userId'] + '.png'
            },
            "offer": {
                "title": "Заголовок предложения " + i,
                "address": "#",
                "price": "#",
                "type": "#",
                "room": "#",
                "guests": "#",
                "checkin": "#",
                "checkout": "#",
                "features": "#",
                "description": "#",
                "photos": "#"
            },
            "location": {
                "x": "#",
                "y": "#"
            }
          }

    };

    return posts;
};
console.log(getPosts(auther));
