"use strict";

(function () {

  const onMouseMove = function (moveEvt, startCoords, mapPinMainElement) {
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

  window.move = {
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp
  };
})();
