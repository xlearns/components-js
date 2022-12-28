import { defineConfig } from "vite";

export default defineConfig({
  plugins:[
    ()=>{
      return {
        name: 'example-plugin',
        resolveId(id) {
          // if (!id.startsWith(sourceThemeChalk)) return
          // return {
          //   id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
          //   external: 'absolute',
          // }
          console.log(id)
        },
      }
    }
  ],
  build: {
    lib: {
      entry: './lib/main.js',
      name: 'Counter',
      fileName: 'counter'
    }
  }
})