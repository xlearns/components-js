
let count = -1;

function element(el){
 return typeof el == 'string'?document.querySelector(el):el;
}

function scrollbar(content){
  let html = content.innerHTML
  
  content.innerHTML = `
  <div class='scrollbar'>
  <div class="scrollbar-content">${html}</div>
  <div class="scrollbar-bar">
    <div class='scrollbar-thumb'></div>
  </div>
  </div>
    `
}

function getScrollWidth(){
  const outer = document.createElement("div");
  outer.style.width = "100px";
  outer.style.visibility = "hidden";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}



export class Scrollbar  {
   constructor(el,options) {
    count++
    this.element = element(el)
    this.options = options || {}
    scrollbar(this.element)
    this.wrap = document.getElementsByClassName("scrollbar-content")[count];
    this.bar = document.getElementsByClassName("scrollbar-bar")[count];
    this.thumb = document.getElementsByClassName("scrollbar-thumb")[count];
    this.cursorDown = false; //是否按下滚动条
    this.clickThumbAxis = 0; //鼠标点击滚动条的位置
    this.gutter = getScrollWidth();
    if (this.gutter && !this.isOverflow()) {
      this.wrap.style.marginRight = `-${this.gutter}px`;
    }
    this.thumbSetStyle()
  }
 
 thumbSetStyle(){
  const {barBackground,thumbBackground} = this.options
  this.bar.style.background = barBackground || 'rgba(0, 0, 0, 0.1)'
  this.thumb.style.background = thumbBackground || 'rgba(135, 141, 153, 0.3)'
 }

 isOverflow(){
  return this.wrap.clientHeight  ===  this.wrap.scrollHeight;
 }

 updateThumb() {
  if(this.isOverflow()) return this.display(false)
  let heightPercentage = (this.wrap.clientHeight * 100) / this.wrap.scrollHeight;
  this.thumb.style.height = heightPercentage + "%";
 }

 display(status) {
  const bool = status ? "block" : "none";
  [(this.thumb, this.bar)].forEach((dom) => {
    dom.style.display = bool;
  });
 }
 
handleScroll() {
 let moveY = (this.wrap.scrollTop * 100) / this.wrap.clientHeight;
  this.thumb.style.transform = "translateY(" + moveY + "%)";
}

init(){
    this.updateThumb();
    this.wrap.addEventListener("scroll", ()=>{
      this.handleScroll()
    });
    this.bar.addEventListener("click", (e)=>{
      this.clickTrackHandle(e)
    });
    this.thumb.addEventListener("mousedown",  (e)=>{
      this.startDrag(e);
      this.clickThumbAxis =
        e.currentTarget.offsetHeight -
        (e.clientY - e.currentTarget.getBoundingClientRect().top);
    });
 }

clickTrackHandle(e) {
  const offset = Math.abs(e.target.getBoundingClientRect().top - e.clientY);
  const thumbHalf = this.thumb.offsetHeight / 2;
  const thumbPositionPercentage =
    ((offset - thumbHalf) * 100) / this.wrap.offsetHeight;
  this.wrap.scrollTop = (thumbPositionPercentage * this.wrap.scrollHeight) / 100;
}

startDrag(e) {
  e.stopImmediatePropagation();
  e.stopPropagation();
  this.cursorDown = true;
  document.addEventListener("mousemove", (e)=>{
    this.mouseMoveDocumentHandler(e)
  });
  document.addEventListener("mouseup",  (e)=>{
    this.mouseUpDocumentHandler(e)
  });
  document.onselectstart = false;
}
 mouseMoveDocumentHandler(e) {
  if (this.cursorDown === false) return;
  const prevPage = this.clickThumbAxis;
  if (!prevPage) return;
  const offset = (this.bar.getBoundingClientRect().top - e.clientY) * -1;
  const thumbClickPosition = this.thumb.offsetHeight - prevPage;
  const thumbPositionPercentage =
    ((offset - thumbClickPosition) * 100) / this.bar.offsetHeight;
  this.wrap.scrollTop = (thumbPositionPercentage * this.wrap.scrollHeight) / 100;
}

 mouseUpDocumentHandler(e) {
  this.cursorDown = false;
  this.clickThumbAxis = 0;
  document.removeEventListener("mousemove", this.mouseMoveDocumentHandler);
  document.onselectstart = null;
}
}



