import * as esbuild from 'esbuild-wasm'
import { fetchPlugin } from '../plugins/fetch-plugin'
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin'

export const startService = async () => {
  await esbuild.initialize({
    worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.3/esbuild.wasm'
  })
}

export const build = async (input: string | undefined, fetchTest: Function) => {
  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [
      unpkgPathPlugin(),
      fetchPlugin(input, fetchTest)
    ],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window'
    }
  })
  return result.outputFiles[0].text
}