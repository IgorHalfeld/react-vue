import React, { useEffect, useState } from 'react'
import { reactive, watch } from '@vue/runtime-dom'

function useReactiveState (obj) {
  const [, tick] = useState(0)

  const [state] = useState(() => {
    const state = reactive(obj)
    watch(state, () => tick(v => !v))
    return state
  })

  return state
}

function App () {
  const state = useReactiveState({ x: 0, y: 0 })

  function handleMouvemove (event) {
    state.x = event.clientX
    state.y = event.clientY
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouvemove)

    return () => window.removeEventListener('mousemove', handleMouvemove)
  })

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <img
        style={{
          position: 'absolute',
          top: `${state.y - 100}px`,
          left: `${state.x - 80}px`
        }}
        width="150"
        src="evan.png"
        alt="exanzin" />

      <pre style={{ position: 'absolute', right: '30px', top: '0px' }}>
        x: {state.x}px - y: {state.y}px
      </pre>
    </div>
  )
}

export default App
