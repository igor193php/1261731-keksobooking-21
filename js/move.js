"use strict";

(function () {
  const mapPinMainElement = document.querySelector('.map__pin--main');
  //const mapPinMainElement = window.main.mapPinMainElement;


  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const offsetLeftStylMapPin = mapPinMainElement.offsetLeft;

    const offsetTopStylMapPin = mapPinMainElement.offsetTop;
    mapPinMainElement.setAttribute("style", "left: " + (offsetLeftStylMapPin - shift.x) + "px; " + "top: " + (offsetTopStylMapPin - shift.y) + "px;");
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

})();
