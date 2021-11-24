import React, { useEffect, useRef, useState } from 'react';
import { build } from '../../esBuild/esbuild';
import styles from './iframe.module.scss'

interface PropsType {
  code: string | undefined
}

const Iframe: React.FC<PropsType> = ({ code = undefined }) => {

  const iframeRef = useRef<any>()
  const [error, setError] = useState()

  useEffect(() => {
    const buildCode = async () => {
      const output = await build(code)
      setError(output.error)
      iframeRef.current.contentWindow.postMessage(output.code, '*')
    }
    buildCode()
    // const timer = setTimeout(async () => {
    //   const output = await build(code)
    //   setError(output.error)
    //   iframeRef.current.contentWindow.postMessage(output.code, '*')
    // }, 750)

    // return () => {
    //   clearTimeout(timer)
    // }
  }, [code])

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (error) => {
            const root = document.querySelector('#root')
            root.innerHTML = '<div>' + error + '</div>'
            console.error(error)
          }
          window.addEventListener('error', (error) => {
            event.preventDefault()
            handleError(error.message)
          })
          window.addEventListener('message', (event) => {
            event.preventDefault()
            try {
              eval(event.data)
            } catch (err) {
              handleError(err)
            }
          })
        </script>
      </body>
    </html>
  `

  return (
    <div className={styles.iframe}>
      <iframe title='code' ref={iframeRef} srcDoc={html} sandbox='allow-scripts' />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Iframe;