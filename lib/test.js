export class Scrollbar {
  constructor(element, options) {
    this.element = element;
    this.scrollbarWidth = 0;
    this.scrollbarHeight = 0;
    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.isDragging = false;
    this.options = {
      width: "auto",
      height: "auto",
      trackColor: "#ddd",
      thumbColor: "#aaa",
      thumbHoverColor: "#999",
      thumbSize: "auto",
      thumbMinSize: 30,
      scrollbarPadding: 5,
      smoothScrolling: true,
      ...options,
    };
  }
}
