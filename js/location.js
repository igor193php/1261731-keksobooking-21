"use strict";

(function () {

  const getChoicedPost = function (posts, getLocationChoicePin) {

    posts.forEach(function (value) {
      if (value.location.y === getLocationChoicePin["pinLocationY"] && value.location.x === getLocationChoicePin["pinLocationX"]) {
        return value;
      }
    });
  };

  const getLocationChoicePin = function (mapOverlayElement) {

    mapOverlayElement.addEventListener('click', function (evt) {
      if (evt.target.matches('img')) {
        const imgElement = evt.target;

        return {
          pinLocationX: evt.target.parentElement.offsetLeft - imgElement.clientWidth,
          pinLocationY: evt.target.parentElement.offsetTop - imgElement.clientHeight
        };
      }
    });

    // mapOverlayElement.addEventListener('keydown', function (evt) {
    // if (evt.keyCode === window.keyboard.isEnterPressed) {
    // const imgElement = evt.target.querySelector('img');
    // const pinLocationX = evt.target.offsetLeft - imgElement.clientWidth;
    // const pinLocationY = evt.target.offsetTop - imgElement.clientHeight;

    //  document.querySelector('.map__card.popup').hidden = false;
    // }
    // });
  };

  window.location = {
    getChoicedPost: getChoicedPost,
    getLocationChoicePin: getLocationChoicePin
  };
})();
