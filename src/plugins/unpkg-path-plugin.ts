import axios from 'axios'
import * as esbuild from 'esbuild-wasm'
import localforage from 'localforage'

const filecache = localforage.createInstance({
  name: 'filecache'
})


export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      //Handler index.js path
      build.onResolve({filter: /^index\.js$/}, () => {
        return { path: 'index.js', namespace: 'a' }
      })

      //Handler path in module
      build.onResolve({filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }
      })

      //Handler other
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }

      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {

        console.log('onLoad', args)
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode
          }
        }

        //Check filecache
        const cacheResult = await filecache.getItem<esbuild.OnLoadResult>(args.path)

        if (cacheResult) {
          return cacheResult
        }

        const { data, request } = await axios.get(args.path)

        const getAxiosResult: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }

        await filecache.setItem(args.path, getAxiosResult)

        return getAxiosResult

      })
    }
  }
}