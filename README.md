# sort-animation

## 实现

我们希望可以通过不同排序方式呈现出动画中的凉凉比较的过程。

index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./css/reset.css" />
    <link rel="stylesheet" href="./css/common.css" />
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <div class="wraper">
      <form action="/login" method="GET">
        <div class="form-control">
          <label for="arrlength">数组长度：</label>
          <input name="arrlength" id="arrlength" type="number" />
          <button id="createArray">创建数组</button>
          <input type="button" id="createArray" value="创建数组" />
        </div>
        <div class="form-control">
          <label for="array">生成数组：</label>
          <textarea
            name="array"
            id="array"
            style="vertical-align: middle; height: auto; width: 80%"
          ></textarea>
        </div>
        <div class="form-control">
          <label for="array">动画效果：</label>
          <button id="slow">减速</button>
          <button id="fast">加速</button>
        </div>
        <div class="form-control">
          <label for="array">排序方式：</label>
          <ul class="sort-style">
            <button class="btn" id="gbubble">冒泡排序 - generator</button>
            <button class="btn" id="bubble">冒泡排序</button>
            <button class="btn" id="choose">选择排序</button>
            <button class="btn" id="quiklly">快速排序</button>
          </ul>
        </div>
      </form>
      <div class="sort-area" id="sortArea"></div>
    </div>
    <script type="module">
      import test from "./js/test.js";
      console.log(test);
    </script>
    <script src="./js/utils.js"></script>
    <script src="./js/sort.js"></script>
    <script src="./js/index.js"></script>
  </body>
</html>
```


./js/utils.js
```js
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
```

./js/sort.js
```js
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

```
./js/index.js
```js
const DEFAULT_CONFIG = {
  arrayLength: 50,
  array: [
    66, 78, 90, 22, 64, 18, 86, 32, 19, 60, 28, 24, 23, 17, 67, 82, 57, 89, 33,
    11, 76, 43, 79, 5, 42, 99, 14, 95, 68, 51, 4, 77, 91, 83, 27, 21, 84, 72, 8,
    30, 71, 52, 20, 94, 80, 29, 81, 26, 39, 53,
  ],
  sortType: "bubble",
  speed: 300,
};
class SortAnimation {
  constructor(array, arrayLength, sortType, speed) {
    this.list = [];
    this.form = null;
    this.array = DEFAULT_CONFIG.array || array;
    this.speed = DEFAULT_CONFIG.speed || speed;
    this.sortType = DEFAULT_CONFIG.array || sortType;
    this.arrayLength = DEFAULT_CONFIG.arrayLength || arrayLength;

    this.sort = SORT[this.sortType];
    this.init();
  }
  init() {
    // 添加点击事件
    this.addEvent();
    // 表单初始化
    this.initForm();
    // 数据图形初始化
    this.renderDom();
  }
  initForm() {
    const array = utils.getElement("textarea[name='array']");
    const arrayLength = utils.getElement("input[name='arrlength']");
    array.value = `[ ${this.array} ]`;
    arrayLength.value = this.arrayLength;
  }
  createArray() {
    // 点击生成数组，会根据数组的长度随机生成数组
    this.oArray = utils.getElement("textarea[name='array']");
    this.oArrayLength = utils.getElement("input[name='arrlength']").value;
    this.array = utils.randomArray(this.arrayLength);
    this.oArray.value = `[ ${this.array} ]`;
    this.clearTimer();
    this.renderDom();
  }
  clearTimer() {
    clearInterval(this.timer);
  }
  renderDom() {
    const sortArea = utils.getElement("#sortArea");
    const fragement = document.createDocumentFragment();
    this.array.map((itm) => {
      const oli = document.createElement("li");
      const ospan = document.createElement("span");
      ospan.setAttribute("class", "sort-span");
      ospan.setAttribute("style", `height:${itm}%`);
      oli.appendChild(ospan);
      oli.setAttribute("class", "sort-li");
      fragement.appendChild(oli);
    });
    sortArea.innerHTML = "";
    sortArea.appendChild(fragement);
  }
  insertDom(array, currentIndex) {
    let html = "";
    let item = "";
    for (let i = 0; i < array.length; i++) {
      if (i == currentIndex + 1 || i == currentIndex) {
        item = `<li class="sort-li"><span class="sort-span sort-span-curret" style="height: ${array[i]}%"></span></li>`;
      } else {
        item = `<li class="sort-li"><span class="sort-span" style="height:${array[i]}%"></span></li>`;
      }
      html += item;
    }

    document.querySelector("#sortArea").innerHTML = html;
  }
  pushList(...arg) {
    this.list.push(arg);
  }
  animation() {
    let arrHis = this.list;
    this.timer = setInterval(() => {
      if (arrHis.length > 0) {
        this.insertDom(arrHis[0][0], arrHis[0][1]);
        arrHis.shift();
      } else {
        this.clearTimer();
      }
    }, this.speed);
  }
  _animation(callback) {
    this.timer = setInterval(async () => {
      callback();
      this.list.next();
    }, this.speed);
  }
  changeSortType(type) {
    this.sortType = type;
    this.sort = SORT[this.sortType];
    this.clearTimer();

    if (this.sortType === "gbubble") {
      this.list = this.sort(this.array);
      this._animation(() => {
        console.log("我想睡觉");
      });
    } else {
      this.sort(this.array);
      this.animation();
    }
  }
  addEvent() {
    this.form = utils.getElement("form");
    this.form.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      if (
        target.nodeName == "BUTTON" ||
        utils.getAttr(target, "type") == "button"
      ) {
        const clickElement = utils.getAttr(target, "id");
        switch (clickElement) {
          case "createArray":
            this.createArray();
            break;
          case "fast":
            console.log("fast");
            break;
          case "slow":
            console.log("slow");
            break;
          default:
            this.changeSortType(clickElement);
            break;
        }
      }
    });
  }
}
new SortAnimation();
```
