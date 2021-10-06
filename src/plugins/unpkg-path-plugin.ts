import * as esbuild from 'esbuild-wasm'


export const unpkgPathPlugin = () => {
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
    }
  }
}