import { Scrollbar } from "./lib";

const dom = document.querySelector(".container");
// 使用示例
const scrollbar = new Scrollbar(dom, {
  width: "100%",
  height: "100%",
  trackColor: "#f00",
  thumbColor: "#0f0",
  thumbHoverColor: "#00f",
  thumbSize: "auto",
  thumbMinSize: 50,
  scrollbarPadding: 10,
  smoothScrolling: false,
});
