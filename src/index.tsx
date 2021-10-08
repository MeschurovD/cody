
//<--------------------IMPORT-------------------------->
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'


//<--------------------COMPONENT----------------------->
const App: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const ref = useRef(false)
  const iframeRef = useRef<any>()

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.3/esbuild.wasm'
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
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    console.log(result)
    //setCode(result.outputFiles[0].text)
    console.log(iframeRef)
    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }
 
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">$</div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              console.log(err)
            }
          })
        </script>
      </body>
    </html>
  `


//<--------------------JSX COMPONENT------------------->
  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Sumbit</button>
      </div>
      <pre>{code}</pre>
      <iframe ref={iframeRef} srcDoc={html} sandbox='allow-scripts' />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))