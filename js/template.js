"use strict";
(function () {

  const getTemplate = function (idTemplate, classTemplate) {
    const pinTemplateElement = document.querySelector(idTemplate).content;

    return pinTemplateElement.querySelector(classTemplate);

  };
  window.template = {
    getTemplate: getTemplate
  };
})();
