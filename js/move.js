"use strict";

(function () {
  const mapPinMainElement = window.main.mapPinMainElement;
  const mapOverlayElement = window.main.mapOverlayElement;
console.log(mapPinMainElement);
  mapPinMainElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  console.log(mapPinMainElement);
  let startCoords = {
x: evt.clientX,
y: evt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    console.log(startCoords.y);
    console.log(moveEvt.clientY);

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    console.log(shift.y);

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

const offsetLeftStylMapPin = mapPinMainElement.offsetLeft;

const offsetTopStylMapPin = mapPinMainElement.offsetTop;
console.log(offsetTopStylMapPin);
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
