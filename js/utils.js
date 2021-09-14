/*
 * @Author: heinan
 * @Date: 2021-09-11 09:19:30
 * @Last Modified by: heinan
 * @Last Modified time: 2021-09-11 09:55:45
 */
const utils = {};

utils.getElement = (selector) => {
  return document.querySelector(`${selector}`);
};
utils.getAttr = (elem, attr) => {
  return elem.getAttribute(attr);
};

utils.randomArray = (length) => {
  let temp = [];
  for (let i = 0; i < length; i++) {
    temp.push(Math.floor(Math.random() * 100));
  }
  return temp;
};
