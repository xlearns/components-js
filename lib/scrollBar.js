export class Scrollbar {
  // 构造函数，用来初始化滚动条对象
  constructor() {
    // 初始化滚动条的样式
    this.style = {
      backgroundColor: "#ddd",
      width: "5px",
      borderRadius: "5px",
    };

    // 初始化滚动条的位置
    this.position = 0;

    // 初始化滚动条的长度
    this.length = 100;

    // 初始化滚动条的滚动背景
    this.scrollBackground = null;
  }

  // 设置滚动条的样式
  setStyle(style) {
    this.style = { ...this.style, ...style };
  }

  // 设置滚动条的位置
  setPosition(position) {
    this.position = position;
  }

  // 设置滚动条的长度
  setLength(length) {
    this.length = length;
  }

  // 设置滚动条的滚动背景
  setScrollBackground(scrollBackground) {
    this.scrollBackground = scrollBackground;
  }

  // 在页面上的某个位置挂载滚动条
  mount(element) {
    // 获取滚动条的 DOM 元素
    let scrollbarElement = this.getScrollbarElement();

    // 将滚动条添加到挂载点
    element.appendChild(scrollbarElement);

    // 监听滚动事件
    element.addEventListener("scroll", this.onScroll.bind(this));

    // 监听滚轮事件
    element.addEventListener("mousewheel", this.onMouseWheel.bind(this));

    // 监听拖拽事件
    scrollbarElement.addEventListener("mousedown", this.onMouseDown.bind(this));
  }

  // 获取滚动条的 DOM 元素
  getScrollbarElement() {
    // 创建滚动条元素
    let scrollbarElement = document.createElement("div");
    scrollbarElement.classList.add("scrollbar");

    // 设置滚动条的样式
    Object.keys(this.style).forEach((key) => {
      scrollbarElement.style[key] = this.style[key];
    });

    // 如果设置了滚动背景，则创建滚动背景元素
    if (this.scrollBackground) {
      let scrollBackgroundElement = document.createElement("div");
      scrollBackgroundElement.classList.add("scrollbar-background");
      scrollBackgroundElement.style.backgroundColor = this.scrollBackground;
      scrollbarElement.appendChild(scrollBackgroundElement);
    }

    return scrollbarElement;
  }

  // 在滚动事件中更新滚动条
  onScroll(event) {
    // 获取滚动条的位置
    let position =
      (event.target.scrollTop / event.target.scrollHeight) * this.length;
    // 更新滚动条的位置
    this.setPosition(position);

    // 更新滚动条的样式
    this.updateScrollbarElement();
  }

  // 在滚轮事件中更新滚动条
  onMouseWheel(event) {
    // 获取滚动条的位置
    let position =
      (event.target.scrollTop / event.target.scrollHeight) * this.length;
    // 根据滚轮的方向调整滚动条的位置
    position += event.deltaY > 0 ? 10 : -10;

    // 限制滚动条的位置范围
    position = Math.max(0, Math.min(this.length, position));

    // 更新滚动条的位置
    this.setPosition(position);

    // 更新滚动条的样式
    this.updateScrollbarElement();
  }

  // 在拖拽事件中更新滚动条
  onMouseDown(event) {
    // 记录鼠标按下时的位置
    this.mouseDownPosition = event.clientY;

    // 记录滚动条按下时的位置
    this.scrollbarDownPosition = this.position;

    // 监听鼠标移动事件
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    // 监听鼠标抬起事件
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  // 在鼠标移动事件中更新滚动条
  onMouseMove(event) {
    // 计算鼠标移动的距离
    let deltaY = event.clientY - this.mouseDownPosition;

    // 计算滚动条的新位置
    let position = this.scrollbarDownPosition + deltaY;

    // 限制滚动条的位置范围
    position = Math.max(0, Math.min(this.length, position));

    // 更新滚动条的位置
    this.setPosition(position);

    // 更新滚动条的样式
    this.updateScrollbarElement();
  }

  // 在鼠标抬起事件中停止拖拽
  onMouseUp() {
    // 取消监听鼠标移动事件
    document.removeEventListener("mousemove", this.onMouseMove);

    // 取消监听鼠标抬起事件
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  // 更新滚动条的样式
  updateScrollbarElement() {
    // 获取滚动条的 DOM 元素
    let scrollbarElement = document.querySelector(".scrollbar");
    // 设置滚动条的位置
    scrollbarElement.style.top = `${this.position}px`;
  }
}
