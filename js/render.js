'use strict';
(function () {

  const PRICE_LOW = 10000;
  const PRICE_HIGH = 50000;

  const getLimitPosts = function (data) {
    const LIMIT = 5;
    return data.slice(0, LIMIT);
  };

  const validateValuePriceFilter = function (value, price) {
    let isEqual = false;

    switch (value) {

      case 'middle':
        if (price >= PRICE_LOW && price <= PRICE_HIGH) {
          isEqual = true;
        }
        break;

      case 'low':
        if (price < PRICE_LOW) {
          isEqual = true;
        }
        break;

      case 'high':
        if (price > PRICE_HIGH) {
          isEqual = false;
        }
        break;
    }

    return isEqual;
  };

  const isEqualFilter = function (offer, filterState) {
    let isEqual = true;

    for (let [name, value] of filterState) {

      if (name === 'housing-type' && value !== 'any' && offer.offer.type !== value) {
        isEqual = false;
      }

      if (name === 'housing-price' && value !== 'any') {
        isEqual = validateValuePriceFilter(value, offer.offer.price);
      }

      if (name === 'housing-rooms' && value !== 'any' && offer.offer.rooms !== Number(value)) {
        isEqual = false;
      }

      if (name === 'housing-guests' && value !== 'any' && offer.offer.guests !== Number(value)) {
        isEqual = false;
      }

      if (name === 'features' && value !== 'any') {
        if (!offer.offer.features.includes(value)) {
          isEqual = false;
        }

      }

    }

    return isEqual;
  };

  const filterOffers = function (offers, filterState) {
    return offers.filter(function (offer) {
      return isEqualFilter(offer, filterState);
    });
  };


  window.render = {
    getLimitPosts: getLimitPosts,
    filterOffers: filterOffers
  };
})();
