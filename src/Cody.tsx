
//<--------------------IMPORT-------------------------->
import { useEffect, useRef, useState } from 'react'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'
import CodeEditor from './components/CodeEditor/CodeEditor'
import { build, startService } from './esBuild/esbuild'




//<--------------------COMPONENT----------------------->
const Cody: React.FC = () => {


  //<--------------------DATA AND STATES----------------->
  const [input, setInput] = useState<string | undefined>('')
  const ref = useRef(false)
  const iframeRef = useRef<any>()


  // const startService = async () => {
  //   await esbuild.initialize({
  //     worker: true,
  //     wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.3/esbuild.wasm'
  //   })
  //   ref.current = true
  // }

  useEffect(() => {
    startService()
    ref.current = true
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return
    }

    iframeRef.current.srcdoc = html

    // const result = await esbuild.build({
    //   entryPoints: ['index.js'],
    //   bundle: true,
    //   write: false,
    //   plugins: [
    //     unpkgPathPlugin(),
    //     fetchPlugin(input)
    //   ],
    //   define: {
    //     'process.env.NODE_ENV': '"production"',
    //     global: 'window'
    //   }
    // })

    const result = await build(input)

    iframeRef.current.contentWindow.postMessage(result, '*')
  }

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div>' + err + '</div>'
              console.error(err)
            }
          })
        </script>
      </body>
    </html>
  `


  //<--------------------JSX COMPONENT------------------->
  return (
    <div>
      <div style={{height: '300px'}}>
        <CodeEditor initialValue={input} onChange={setInput} />
      </div>
      <div>
        <button onClick={onClick}>Sumbit</button>
      </div>
      <iframe title='code' ref={iframeRef} srcDoc={html} sandbox='allow-scripts' />
    </div>
  )
}

export default Cody