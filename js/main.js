"use strict";

const pinTemplates = getTemplate('#pin', '.map__pin');
const posts = getPosts(8);

const getTemplate = function (idTemplate, classTemplate) {
  const pinTemplateElement = document.querySelector(idTemplate).content;

  return pinTemplateElement.querySelector(classTemplate);

};