export class Scrollbar  {
  constructor(el) {
    this.element = el
    const shadow = this.element.attachShadow({mode: 'open'});
    const messageEle = document.createElement('div');
    messageEle.setAttribute('class', 'red');
    const messageSty = document.createElement('style');
    messageSty.textContent = `
     .red{
      color:red
     }
    `
    messageEle.innerHTML = this.element.innerHTML
    messageEle.appendChild(messageSty)
    shadow.appendChild(messageEle)
  }
}
