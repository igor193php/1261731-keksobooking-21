"use strict";

(function () {
  const mapOverlayElement = document.querySelector('.map__overlay');
  const MAX_LOCATION_Y = 630;
  const MIN_LOCATION_Y = 130;
  const MAX_LOCATION_X = mapOverlayElement.clientWidth;
  const MIN_LOCATION_X = 0;
  const CORRECT_LOCATION_X = 30
  const mapPinMainElement = window.main.mapPinMainElement;
  const adressElement = window.settings.address;


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

      let TopCoordY = offsetTopStylMapPin - shift.y;
      let LeftCoordX = offsetLeftStylMapPin - shift.x;

      if (TopCoordY < MIN_LOCATION_Y) {
        TopCoordY = MIN_LOCATION_Y;
      } else if (TopCoordY > MAX_LOCATION_Y) {
        TopCoordY = MAX_LOCATION_Y;
      }

      if (LeftCoordX < MIN_LOCATION_X) {
        LeftCoordX = MIN_LOCATION_X;
      } else if (LeftCoordX > MAX_LOCATION_X) {
        LeftCoordX = MAX_LOCATION_X;
      }

      mapPinMainElement.setAttribute("style", "left: " + LeftCoordX + "px; " + "top: " + TopCoordY + "px;");
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      adressElement.value = mapPinMainElement.offsetLeft + ', ' + mapPinMainElement.offsetTop;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
