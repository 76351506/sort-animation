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
