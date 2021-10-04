import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

const App: React.FC = () => {

  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const ref = useRef(false)

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
    ref.current = true
  } 

  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return
    }
    console.log(ref.current);
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    console.log(result)
    setCode(result.outputFiles[0].text)
  }
 
  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Sumbit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))