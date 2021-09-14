/*
 * @Author: heinan
 * @Date: 2021-09-11 10:01:37
 * @Last Modified by: heinan
 * @Last Modified time: 2021-09-13 14:52:29
 */

const SORT = {
  *gbubble(array) {
    for (var i = 0; i < array.length; i++) {
      for (var k = i + 1; k < array.length; k++) {
        if (array[i] > array[k]) {
          yield this.insertDom(array.slice(), k);
          var temp = array[i];
          array[i] = array[k];
          array[k] = temp;
        }
      }
    }
    return array;
  },
  bubble(array) {
    for (var i = 0; i < array.length; i++) {
      for (var k = i + 1; k < array.length; k++) {
        if (array[i] > array[k]) {
          this.pushList(array.slice(), k);
          var temp = array[i];
          array[i] = array[k];
          array[k] = temp;
        }
      }
    }
    return array;
  },
};
