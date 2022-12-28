const app = document.querySelector('#app');
const examples = import.meta.glob('./example/*.html')
let html = ''
Object.entries(examples).forEach(([key,val]) => {
  html +=`<p><a href='${key}'>${key.replace('./example/','')}</a></p>`
})

app.innerHTML = html