'use strict';
(function () {
  const getLimitPosts = function (data) {
    const LIMIT = 6;
    return data.slice(0, LIMIT);
  };

  const sortByTypeRoom = function (filterValue, data) {
    return data.filter(function (post) {
      return post.offer.type === filterValue;
    });
  };

  window.render = {
    getLimitPosts: getLimitPosts,
    sortByTypeRoom: sortByTypeRoom
  };
})();
