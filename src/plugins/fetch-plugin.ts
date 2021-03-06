import * as esbuild from 'esbuild-wasm'
import axios from 'axios'


const cache: any[] = []


export const fetchPlugin = (inputCode: string | undefined) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      build.onLoad({ filter: /^index\.js$/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode
        }
      })


      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        //Поиск в Кеше
        const cacheResult = await cache.find((item) => item.path === args.path)
        if (cacheResult) {
          return cacheResult.getAxiosResult
        }

        const { data, request }: { data: string, request: any } = await axios.get(args.path)

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
          `

        const getAxiosResult: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        }

        //Сохранение в Кеш
        await cache.push({
          path: args.path,
          getAxiosResult
        })


        return getAxiosResult
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {

        //Поиск в Кеше
        const cacheResult = await cache.find((item) => item.path === args.path)
        if (cacheResult) {
          return cacheResult.getAxiosResult
        }

        const { data, request } = await axios.get(args.path)

        const getAxiosResult: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }

        //Сохранение в Кеш
        await cache.push({
          path: args.path,
          getAxiosResult
        })

        return getAxiosResult
      })
    }
  }
}