"use strict";

(function () {
  const mapPinMainElement = window.main.mapPinMainElement;

  mapPinMainElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  let startCoords = {
x: evt.clientX,
y: evt.clientY
  };
  console.log(startCoords.y);
  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    console.log(startCoords.y);
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
mapPinMainElement.setAttribute("style", "left: " + (offsetLeftStylMapPin - shift.x) + "px, " + "top: " + (offsetTopStylMapPin - shift.y) + "px;");
  };

document.addEventListener('mousemove', onMouseMove);
//document.addEventListener('mouseup', onMouseUp);
});
})();
