'use strict';
(function () {
  const getLimitPosts = function (data) {
    const LIMIT = 5;
    return data.slice(0, LIMIT);
  };

  const getResultFilter = function (data, valueFilter) {
    let result = '';
    const typeValue = Object.keys(valueFilter);

    const getPostByPrice = function (value) {

      switch (valueFilter[value]) {
        case 'any':
          result = data;
          break;
        case 'middle':
          result = data.filter(function (post) {
            return post.offer.price > 10000 && post.offer.price < 50000;
          });
          break;
        case 'low':
          result = data.filter(function (post) {
            return post.offer.price < 10000;
          });
          break;
        case 'high':
          result = data.filter(function (post) {
            return post.offer.price > 50000;
          });
          break;
      }

      return result;
    };


    typeValue.forEach(function (value) {

      if (valueFilter[value] !== 'any') {

        switch (value) {
          case 'housing-type':
            result = data.filter(function (post) {
              return post.offer.type === valueFilter[value];
            });
            break;
          case 'housing-price':
            getPostByPrice(value);
            break;
          case 'housing-rooms':
            result = data.filter(function (post) {
              return post.offer.rooms === Number(valueFilter[value]);
            });
            break;
          case 'housing-guests':
            result = data.filter(function (post) {
              return post.offer.guests === Number(valueFilter[value]);
            });
            break;
        }

      } else {
        result = data;
      }

    });

    return result;

  };

  window.render = {
    getLimitPosts: getLimitPosts,
    getResultFilter: getResultFilter
  };
})();
