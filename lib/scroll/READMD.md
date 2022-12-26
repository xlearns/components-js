# target

- 鼠标左键点击可以拖动
- 鼠标滑轮滚动
- 内容发生变化，自动更新滚动条长度
- 提供开发者一个滚动回调的接口
- 水平方向
- 当内容没有超出内容区的时候不显示滚动条

## code

- 隐藏原生滚动条
  - 为什么是隐藏而不是直接去掉呢，因为要实现滚动功能还是需要利用原生滚动条的能力。所以只是为了让 ui 统一，所以隐掉
  - 通过 margin-right，将内容区移动负滚动条宽
  - 通过 css 通过的`scrollbar-width`【火狐】、`::-webkit-scrollbar:{width:0}`
    - 存在兼容问题
      - [::-webkit-scrollbar](https://caniuse.com/?search=%3A%3A-webkit-scrollbar)
      - [scrollbar-width](https://caniuse.com/?search=scrollbar-width)
