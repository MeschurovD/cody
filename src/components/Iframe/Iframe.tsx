import React, { useEffect, useRef } from 'react';
import { build } from '../../esBuild/esbuild';
import styles from './iframe.module.scss'

interface PropsType {
  code: string | undefined
}

const Iframe: React.FC<PropsType> = ({code = undefined}) => {

  const iframeRef = useRef<any>()

  useEffect(() => {
    if (code) {
      const timer = setTimeout(async () => {
        const output = await build(code)
        iframeRef.current.contentWindow.postMessage(output, '*')
      }, 750)
    }
  }, [code])

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

  return (
    <div className={styles.iframe}>
      <iframe title='code' ref={iframeRef} srcDoc={html} sandbox='allow-scripts' />
    </div>
  );
};

export default Iframe;