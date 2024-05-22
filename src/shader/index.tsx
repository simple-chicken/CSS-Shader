import React, { useEffect, useRef, Suspense, lazy } from 'react'
// import { vertexShaderSource, fragmentShaderSource } from './demo1'

const LazyComponent = lazy(() => import('../background'))

export default function ShaderDemo() {
  const c = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!c?.current) return
    const gl = c.current.getContext('webgl')
    if (!gl) return
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    // const fragmentShader = createShader(
    //   gl,
    //   gl.FRAGMENT_SHADER,
    //   fragmentShaderSource
    // )
    import(/* webpackChunkName: "asyncModule1" */ './demo1').then(
      ({ vertexShaderSource, fragmentShaderSource }) => {
        console.log(11, vertexShaderSource, fragmentShaderSource)
      }
    )
  }, [])
  return (
    <>
      <canvas id="c" style={{ width: 300, height: 300 }} ref={c}></canvas>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </>
  )
}
