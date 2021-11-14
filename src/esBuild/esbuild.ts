import * as esbuild from 'esbuild-wasm'
import { fetchPlugin } from '../plugins/fetch-plugin'
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin'

//Создание конфигурации esbuild
export const startService = async () => {
  await esbuild.initialize({
    worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.3/esbuild.wasm'
  })
}

//Сборка esbuild
export const build = async (input: string | undefined) => {
  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    return {
      code: result.outputFiles[0].text,
      error: ''
    }
  } catch (err: any) {
    return {
      code: '',
      error: err.message
    }
  }
  
}